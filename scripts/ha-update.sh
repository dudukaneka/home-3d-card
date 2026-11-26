#!/bin/sh
set -eu

if [ -d /config ]; then
  CONFIG_DIR="/config"
elif [ -d /homeassistant ]; then
  CONFIG_DIR="/homeassistant"
else
  echo "Error: Neither /config nor /homeassistant directory was found." >&2
  exit 1
fi

REPO_DIR="$CONFIG_DIR/repos/home-3d-card"
WWW_DIR="$CONFIG_DIR/www/home-3d"
CRED_FILE="$CONFIG_DIR/.git-credentials"

mkdir -p "$WWW_DIR"

if command -v git >/dev/null 2>&1 && [ -d "$REPO_DIR/.git" ]; then
  cd "$REPO_DIR"
  if [ -f "$CRED_FILE" ]; then
    git config credential.helper "store --file=$CRED_FILE"
  fi
  git pull --ff-only
  cp "$REPO_DIR/dist/home-3d-card.js" "$WWW_DIR/home-3d-card.js"
  echo "Updated via git pull -> $WWW_DIR/home-3d-card.js"
  exit 0
fi

# Fallback for containers without git (e.g. minimal HA Core container): fetch built JS via Python stdlib
if command -v python3 >/dev/null 2>&1 && [ -f "$CRED_FILE" ]; then
  python3 - "$CRED_FILE" "$WWW_DIR/home-3d-card.js" <<'PYEOF'
import sys, re, urllib.request

cred_path, out_path = sys.argv[1], sys.argv[2]
with open(cred_path, "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"https://[^:]+:([^@]+)@github\.com", text)
if not m:
    raise SystemExit("No GitHub token found in " + cred_path)

token = m.group(1).strip()
req = urllib.request.Request(
    "https://api.github.com/repos/dudukaneka/home-3d-card/contents/dist/home-3d-card.js",
    headers={
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github.raw+json",
        "User-Agent": "home-3d-card-updater",
    },
)
with urllib.request.urlopen(req, timeout=30) as resp:
    data = resp.read()

with open(out_path, "wb") as out:
    out.write(data)
print(f"Updated via GitHub API ({len(data)} bytes) -> {out_path}")
PYEOF
  exit 0
fi

echo "Error: Neither git repo ($REPO_DIR) nor python3 + $CRED_FILE was available." >&2
exit 1
