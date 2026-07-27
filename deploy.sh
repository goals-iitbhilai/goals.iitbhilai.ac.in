#!/bin/bash

# Guard against .env file not existing
if [ ! -f .env ]; then
    echo "Error: .env file not found. See .env.example for instructions."
    exit 1
fi

# Load variables from .env
export $(cat .env | xargs)

# Guard against environment variables not existing
if [[ -z "$GOALS_SSH_HOSTNAME" || -z "$GOALS_SSH_USERNAME" || -z "$GOALS_SSH_PASSWORD" ]]; then
    echo "Error: One or more required environment variables are missing."
    exit 1
fi

# Guard against sshpass not being installed
if ! command -v sshpass &> /dev/null; then
    echo "Error: sshpass is not installed."
    exit 1
fi

# Build site
echo "Building site..."
npm run build

# Returns status of Cloudflare warp
get_warp_cli_status() {
    warp-cli status | grep "Status update" | awk '{print $3}'
}

# Copies the built site to the server
copy_site() {
    # If warp is installed, store its current state and disable it
    local was_warp_enabled
    if command -v warp-cli &> /dev/null; then
        was_warp_enabled=$(get_warp_cli_status)
        echo "warp-cli status: $was_warp_enabled"

        if [ "$was_warp_enabled" = "Connected" ]; then
            warp-cli disconnect
            sleep 1
        fi
    fi

    # Copy the files using rsync
    export SSHPASS="$GOALS_SSH_PASSWORD"
    sshpass -e rsync -avz "dist/" "$GOALS_SSH_USERNAME@$GOALS_SSH_HOSTNAME:/srv/goals.iitbhilai.ac.in/pub"

    # If warp is installed, restore its original state
    if command -v warp-cli &> /dev/null; then
        if [ "$was_warp_enabled" = "Connected" ]; then
            warp-cli connect
        fi
    fi
}

# Start copying built assets
echo "Copying site..."
copy_site
echo "Done."
