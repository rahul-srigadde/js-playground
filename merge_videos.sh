#!/bin/bash

# Video Merger Script - Lossless concatenation of videos in a directory
# Compatible with macOS default bash (3.2) and modern bash.
#
# Usage: ./merge_videos.sh [directory] [output_filename]
#   directory       - folder containing the videos (default: current dir)
#   output_filename - name of the merged file (default: merged_output.mp4)

set -euo pipefail

# ---- Config -----------------------------------------------------------------
INPUT_DIR="${1:-.}"
OUTPUT_FILE="${2:-merged_output.mp4}"
VIDEO_EXTENSIONS=(mp4 mov avi mkv flv wmv webm m4v ts)

# ---- Colors -----------------------------------------------------------------
RED=$'\033[0;31m'; GREEN=$'\033[0;32m'; YELLOW=$'\033[1;33m'; BLUE=$'\033[0;34m'; NC=$'\033[0m'

echo "${BLUE}Video Merger${NC}"
echo "${BLUE}============${NC}"

# ---- Preconditions ----------------------------------------------------------
if ! command -v ffmpeg >/dev/null 2>&1; then
    echo "${RED}Error: FFmpeg is not installed or not in PATH.${NC}"
    echo "Install it first:"
    echo "  macOS : brew install ffmpeg"
    echo "  Ubuntu: sudo apt install ffmpeg"
    exit 1
fi

if [[ ! -d "$INPUT_DIR" ]]; then
    echo "${RED}Error: Directory '$INPUT_DIR' does not exist.${NC}"
    exit 1
fi

# Make output an absolute path so it isn't picked up as an input, and isn't
# affected by relative paths inside the concat list.
case "$OUTPUT_FILE" in
    /*) : ;;                                   # already absolute
    *)  OUTPUT_FILE="$(pwd)/$OUTPUT_FILE" ;;
esac

# ---- Collect video files (bash 3.2 safe, handles spaces/newlines) -----------
echo "${YELLOW}Scanning: $INPUT_DIR${NC}"

# Build a find expression matching all extensions case-insensitively.
find_args=()
for ext in "${VIDEO_EXTENSIONS[@]}"; do
    if [[ ${#find_args[@]} -gt 0 ]]; then find_args+=(-o); fi
    find_args+=(-iname "*.$ext")
done

video_files=()
while IFS= read -r -d '' file; do
    # Skip the output file if it lives in the scanned directory.
    [[ "$file" == "$OUTPUT_FILE" ]] && continue
    video_files+=("$file")
done < <(find "$INPUT_DIR" -maxdepth 1 -type f \( "${find_args[@]}" \) -print0 | sort -z)

if [[ ${#video_files[@]} -eq 0 ]]; then
    echo "${RED}No video files found in: $INPUT_DIR${NC}"
    echo "Supported: ${VIDEO_EXTENSIONS[*]}"
    exit 1
fi

echo "${GREEN}Found ${#video_files[@]} file(s) (merge order):${NC}"
i=1
for f in "${video_files[@]}"; do
    echo "  $i. $(basename "$f")"
    i=$((i + 1))
done

# ---- Compatibility check for lossless concat --------------------------------
# The concat demuxer with `-c copy` only works losslessly when every input
# shares the same codec, resolution, and frame rate. Otherwise we re-encode.
stream_signature() {
    ffprobe -v error -select_streams v:0 \
        -show_entries stream=codec_name,width,height,r_frame_rate \
        -of csv=p=0 "$1"
}

echo "${YELLOW}Checking stream compatibility...${NC}"
first_sig="$(stream_signature "${video_files[0]}")"
compatible=true
for f in "${video_files[@]:1}"; do
    sig="$(stream_signature "$f")"
    if [[ "$sig" != "$first_sig" ]]; then
        echo "${YELLOW}  Mismatch: $(basename "$f")${NC}"
        echo "    expected: $first_sig"
        echo "    got     : $sig"
        compatible=false
    fi
done

# ---- Build the concat list file ---------------------------------------------
temp_list="$(mktemp -t mergevideos)"
trap 'rm -f "$temp_list"' EXIT

for f in "${video_files[@]}"; do
    # Absolute path so concat resolves correctly regardless of CWD.
    case "$f" in
        /*) abs="$f" ;;
        *)  abs="$(cd "$(dirname "$f")" && pwd)/$(basename "$f")" ;;
    esac
    # Escape single quotes for the concat demuxer's `file '...'` syntax.
    escaped=$(printf "%s" "$abs" | sed "s/'/'\\\\''/g")
    printf "file '%s'\n" "$escaped" >> "$temp_list"
done

# ---- Merge ------------------------------------------------------------------
if [[ "$compatible" == true ]]; then
    echo "${GREEN}Streams match -> lossless stream copy (no re-encode).${NC}"
    ffmpeg -hide_banner -f concat -safe 0 -i "$temp_list" -c copy -movflags +faststart -y "$OUTPUT_FILE"
else
    echo "${YELLOW}Streams differ -> high-quality re-encode (CRF 18, x264).${NC}"
    echo "${YELLOW}This is visually lossless but slower.${NC}"

    # Scale/pad everything to the largest resolution present so nothing is
    # downscaled (quality preserved for the highest-res source).
    max_w=0; max_h=0
    for f in "${video_files[@]}"; do
        w=$(ffprobe -v error -select_streams v:0 -show_entries stream=width  -of csv=p=0 "$f")
        h=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$f")
        [[ "$w" =~ ^[0-9]+$ && "$w" -gt "$max_w" ]] && max_w="$w"
        [[ "$h" =~ ^[0-9]+$ && "$h" -gt "$max_h" ]] && max_h="$h"
    done
    echo "${BLUE}Target resolution: ${max_w}x${max_h}${NC}"

    ffmpeg -hide_banner -f concat -safe 0 -i "$temp_list" \
        -vf "scale=${max_w}:${max_h}:force_original_aspect_ratio=decrease,pad=${max_w}:${max_h}:(ow-iw)/2:(oh-ih)/2:black,setsar=1" \
        -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p \
        -c:a aac -b:a 320k \
        -movflags +faststart \
        -y "$OUTPUT_FILE"
fi

# ---- Report -----------------------------------------------------------------
if [[ -f "$OUTPUT_FILE" ]]; then
    size=$(du -h "$OUTPUT_FILE" | cut -f1)
    echo "${GREEN}Done. Output: $OUTPUT_FILE (${size})${NC}"
    ffprobe -v error -show_entries format=duration \
        -show_entries stream=codec_name,width,height -of default=noprint_wrappers=1 "$OUTPUT_FILE"
else
    echo "${RED}Failed to create output file.${NC}"
    exit 1
fi
