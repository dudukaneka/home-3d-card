#!/bin/sh
set -eu

REPO_URL="${HOME_3D_REPO_URL:-https://github.com/dudukaneka/home-3d-card.git}"

if [ -d /config ]; then
  CONFIG_DIR="/config"
elif [ -d /homeassistant ]; then
  CONFIG_DIR="/homeassistant"
else
  echo "Error: Neither /config nor /homeassistant directory was found." >&2
  exit 1
fi

REPOS_DIR="$CONFIG_DIR/repos"
REPO_DIR="$REPOS_DIR/home-3d-card"
WWW_DIR="$CONFIG_DIR/www/home-3d"
CRED_FILE="$CONFIG_DIR/.git-credentials"

mkdir -p "$REPOS_DIR" "$WWW_DIR"

if [ ! -f "$CRED_FILE" ]; then
  printf "GitHub username [dudukaneka]: "
  read -r GH_USER
  GH_USER="${GH_USER:-dudukaneka}"
  printf "GitHub Fine-Grained PAT (Contents read-only): "
  stty -echo 2>/dev/null || true
  read -r GH_TOKEN
  stty echo 2>/dev/null || true
  printf "\n"
  # Strip any accidental trailing tilde from terminal paste quirks
  GH_TOKEN=$(printf "%s" "$GH_TOKEN" | sed 's/~$//')
  if [ -z "$GH_TOKEN" ]; then
    echo "Error: Empty token provided." >&2
    exit 1
  fi
  printf "https://%s:%s@github.com\n" "$GH_USER" "$GH_TOKEN" > "$CRED_FILE"
  chmod 600 "$CRED_FILE"
fi

git config --global credential.helper "store --file=$CRED_FILE"

if [ -d "$REPO_DIR/.git" ]; then
  cd "$REPO_DIR"
  git config credential.helper "store --file=$CRED_FILE"
  git pull --ff-only
else
  git clone "$REPO_URL" "$REPO_DIR"
  cd "$REPO_DIR"
  git config credential.helper "store --file=$CRED_FILE"
fi

cp "$REPO_DIR/dist/home-3d-card.js" "$WWW_DIR/home-3d-card.js"

echo "Installed home-3d-card to $WWW_DIR/home-3d-card.js"
echo "Add Lovelace Resource: /local/home-3d/home-3d-card.js (JavaScript Module)"
