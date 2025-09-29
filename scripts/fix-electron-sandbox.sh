#!/usr/bin/env bash
set -euo pipefail

SANDBOX_PATH="node_modules/electron/dist/chrome-sandbox"

if [ ! -f "$SANDBOX_PATH" ]; then
  echo "❌ File $SANDBOX_PATH not found. Check if electron is installed."
  exit 1
fi

echo "🔧 Setting up permissions for $SANDBOX_PATH ..."

sudo chown root:root "$SANDBOX_PATH"

sudo chmod 4755 "$SANDBOX_PATH"

echo "✅ Done. Now you can run yarn dev"
