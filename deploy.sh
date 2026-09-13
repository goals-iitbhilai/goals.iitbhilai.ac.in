#!/bin/bash

# Guard against .env file not existing
if [ ! -f .env ]; then
    echo "Error: .env file not found."
    exit 1
fi

# Load variables from .env
export $(cat .env | xargs)

# Guard against environment variables not existing
if [[ -z "$SSH_HOST" || -z "$SSH_USER" || -z "$SSH_PASS" || -z "$SSH_DEST" ]]; then
    echo "Error: One or more required environment variables are missing."
    exit 1
fi

# Guard against sshpass not being installed
if ! command -v sshpass &> /dev/null; then
    echo "Error: sshpass is not installed."
    exit 1
fi

# Build the site using Astro.
npm run build

# Use `sshpass` and `rsync` to sync the built assets.
SSHPASS="$SSH_PASS" sshpass \
    -e rsync -avzP --delete \
    "dist/" "$SSH_USER@$SSH_HOST:$SSH_DEST"
