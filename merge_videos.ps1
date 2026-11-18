<#
.SYNOPSIS
    Merge all videos in a directory without losing quality (Windows/PowerShell).

.DESCRIPTION
    Uses FFmpeg. If every input shares the same codec, resolution and frame rate,
    it does a lossless stream copy (no re-encode). Otherwise it re-encodes at
    visually-lossless quality (x264 CRF 18) scaled up to the largest resolution
    present, so nothing is ever downscaled.

    Works on Windows PowerShell 5.1 (built into Windows 10/11) and PowerShell 7+.

.PARAMETER InputDir
    Folder containing the videos. Default: current directory.

.PARAMETER OutputFile
    Name/path of the merged file. Default: merged_output.mp4

.EXAMPLE
    .\merge_videos.ps1
    .\merge_videos.ps1 -InputDir "C:\Clips"
    .\merge_videos.ps1 -InputDir "C:\Clips" -OutputFile "final.mp4"

.NOTES
    If script execution is blocked, run once:
        powershell -ExecutionPolicy Bypass -File .\merge_videos.ps1
#>

[CmdletBinding()]
param(
    [string]$InputDir = ".",
    [string]$OutputFile = "merged_output.mp4"
)

$ErrorActionPreference = "Stop"

$VideoExtensions = @("mp4","mov","avi","mkv","flv","wmv","webm","m4v","ts")

Write-Host "Video Merger" -ForegroundColor Cyan
Write-Host "============" -ForegroundColor Cyan

# ---- Preconditions ----------------------------------------------------------
function Test-Command($name) {
    return [bool](Get-Command $name -ErrorAction SilentlyContinue)
}

if (-not (Test-Command "ffmpeg")) {
    Write-Host "Error: FFmpeg is not installed or not in PATH." -ForegroundColor Red
    Write-Host "Install it first:"
    Write-Host "  winget install Gyan.FFmpeg"
    Write-Host "  or download from https://ffmpeg.org/download.html and add it to PATH"
    exit 1
}
if (-not (Test-Command "ffprobe")) {
    Write-Host "Error: ffprobe not found (ships with FFmpeg). Ensure the full FFmpeg build is on PATH." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path -LiteralPath $InputDir -PathType Container)) {
    Write-Host "Error: Directory '$InputDir' does not exist." -ForegroundColor Red
    exit 1
}

# Resolve output to an absolute path so it isn't picked up as an input.
$OutputFile = [System.IO.Path]::GetFullPath(
    [System.IO.Path]::Combine((Get-Location).Path, $OutputFile)
)

# ---- Collect video files ----------------------------------------------------
Write-Host "Scanning: $InputDir" -ForegroundColor Yellow

$videoFiles = Get-ChildItem -LiteralPath $InputDir -File |
    Where-Object { $VideoExtensions -contains $_.Extension.TrimStart('.').ToLower() } |
    Where-Object { $_.FullName -ne $OutputFile } |
    Sort-Object Name

if ($videoFiles.Count -eq 0) {
    Write-Host "No video files found in: $InputDir" -ForegroundColor Red
    Write-Host ("Supported: " + ($VideoExtensions -join ", "))
    exit 1
}

Write-Host "Found $($videoFiles.Count) file(s) (merge order):" -ForegroundColor Green
$idx = 1
foreach ($f in $videoFiles) {
    Write-Host ("  {0}. {1}" -f $idx, $f.Name)
    $idx++
}

# ---- Compatibility check for lossless concat --------------------------------
function Get-StreamSignature($path) {
    # codec_name,width,height,r_frame_rate on the first video stream
    return (& ffprobe -v error -select_streams v:0 `
        -show_entries stream=codec_name,width,height,r_frame_rate `
        -of csv=p=0 -- "$path") -join ","
}

Write-Host "Checking stream compatibility..." -ForegroundColor Yellow
$firstSig = Get-StreamSignature $videoFiles[0].FullName
$compatible = $true
foreach ($f in ($videoFiles | Select-Object -Skip 1)) {
    $sig = Get-StreamSignature $f.FullName
    if ($sig -ne $firstSig) {
        Write-Host "  Mismatch: $($f.Name)" -ForegroundColor Yellow
        Write-Host "    expected: $firstSig"
        Write-Host "    got     : $sig"
        $compatible = $false
    }
}

# ---- Build the concat list file ---------------------------------------------
# FFmpeg concat demuxer wants:  file '<path>'  with ' escaped as '\''
$tempList = [System.IO.Path]::GetTempFileName()
try {
    $lines = foreach ($f in $videoFiles) {
        $escaped = $f.FullName -replace "'", "'\''"
        "file '$escaped'"
    }
    # ASCII/UTF-8 without BOM; FFmpeg does not want a BOM on the list file.
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllLines($tempList, $lines, $utf8NoBom)

    # ---- Merge --------------------------------------------------------------
    if ($compatible) {
        Write-Host "Streams match -> lossless stream copy (no re-encode)." -ForegroundColor Green
        & ffmpeg -hide_banner -f concat -safe 0 -i "$tempList" `
            -c copy -movflags +faststart -y "$OutputFile"
    }
    else {
        Write-Host "Streams differ -> high-quality re-encode (CRF 18, x264)." -ForegroundColor Yellow
        Write-Host "This is visually lossless but slower." -ForegroundColor Yellow

        # Find the largest resolution so nothing gets downscaled.
        $maxW = 0; $maxH = 0
        foreach ($f in $videoFiles) {
            $w = (& ffprobe -v error -select_streams v:0 -show_entries stream=width  -of csv=p=0 -- "$($f.FullName)")
            $h = (& ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 -- "$($f.FullName)")
            if ($w -match '^\d+$' -and [int]$w -gt $maxW) { $maxW = [int]$w }
            if ($h -match '^\d+$' -and [int]$h -gt $maxH) { $maxH = [int]$h }
        }
        Write-Host "Target resolution: ${maxW}x${maxH}" -ForegroundColor Cyan

        $vf = "scale=${maxW}:${maxH}:force_original_aspect_ratio=decrease," +
              "pad=${maxW}:${maxH}:(ow-iw)/2:(oh-ih)/2:black,setsar=1"

        & ffmpeg -hide_banner -f concat -safe 0 -i "$tempList" `
            -vf $vf `
            -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p `
            -c:a aac -b:a 320k `
            -movflags +faststart -y "$OutputFile"
    }

    if ($LASTEXITCODE -ne 0) {
        Write-Host "FFmpeg failed (exit code $LASTEXITCODE)." -ForegroundColor Red
        exit $LASTEXITCODE
    }
}
finally {
    Remove-Item -LiteralPath $tempList -ErrorAction SilentlyContinue
}

# ---- Report -----------------------------------------------------------------
if (Test-Path -LiteralPath $OutputFile) {
    $sizeMB = [math]::Round((Get-Item -LiteralPath $OutputFile).Length / 1MB, 1)
    Write-Host "Done. Output: $OutputFile (${sizeMB} MB)" -ForegroundColor Green
    & ffprobe -v error -show_entries format=duration `
        -show_entries stream=codec_name,width,height `
        -of default=noprint_wrappers=1 -- "$OutputFile"
}
else {
    Write-Host "Failed to create output file." -ForegroundColor Red
    exit 1
}
