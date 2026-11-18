#!/usr/bin/env python3
"""Merge all PDFs in a directory into a single new PDF.

Install:  pip install pypdf
Usage:    python merge_pdfs.py                 (asks you for the folder path)
          python merge_pdfs.py /path/to/folder
          python merge_pdfs.py /path/to/folder -o combined.pdf

Merged file is saved in the same folder as merged.pdf by default.
"""
import argparse
import re
import sys
from pathlib import Path

from pypdf import PdfReader, PdfWriter


def natural_key(path: Path):
    """Sort 'file2.pdf' before 'file10.pdf' (natural order, case-insensitive)."""
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", path.name)]


def merge_pdfs(directory: Path, output: Path) -> None:
    pdf_files = sorted(
        (p for p in directory.glob("*.pdf") if p.resolve() != output.resolve()),
        key=natural_key,
    )
    if not pdf_files:
        sys.exit(f"No PDF files found in {directory}")

    writer = PdfWriter()
    for pdf in pdf_files:
        try:
            reader = PdfReader(pdf)
            if reader.is_encrypted:
                print(f"Skipping (encrypted): {pdf.name}")
                continue
            # Adds the file as a bookmark and appends all its pages
            writer.append(reader, outline_item=pdf.stem)
            print(f"Added: {pdf.name} ({len(reader.pages)} pages)")
        except Exception as e:
            print(f"Skipping (error: {e}): {pdf.name}")

    with open(output, "wb") as f:
        writer.write(f)
    print(f"\nMerged PDF saved to: {output}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Merge all PDFs in a directory.")
    parser.add_argument("directory", type=Path, nargs="?", default=None,
                        help="Folder containing PDFs (prompted if omitted)")
    parser.add_argument("-o", "--output", type=Path, default=None,
                        help="Output file (default: <directory>/merged.pdf)")
    args = parser.parse_args()

    directory = args.directory
    if directory is None:
        raw = "/Users/rahulsrigadde/personal/study/CodeWithMosh - Spring Boot Mastering The Fundamentals (2025-4)/0. Resources"
        directory = Path(raw.replace("\\ ", " "))  # handles drag-and-drop paths
    directory = directory.expanduser()

    if not directory.is_dir():
        sys.exit(f"Not a directory: {directory}")

    out = args.output or directory / "merged.pdf"
    merge_pdfs(directory, out)