#!/bin/sh
set -e

# Project root
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "Cleaning build artifacts in $ROOT_DIR"
rm -rf "$ROOT_DIR/dist" \
  "$ROOT_DIR/.astro" \
  "$ROOT_DIR/.cache" \
  "$ROOT_DIR/.vercel" \
  "$ROOT_DIR/dist/pagefind"

if [ "$1" = "all" ]; then
  echo "Removing dependencies and pnpm-related folders..."
  rm -rf "$ROOT_DIR/node_modules" \
    "$ROOT_DIR/.pnpm" \
    "$ROOT_DIR/.pnpm-store" \
    "$ROOT_DIR/.pnp"
fi

echo "Clean complete."
