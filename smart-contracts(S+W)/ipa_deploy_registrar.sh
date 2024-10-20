#!/bin/bash

# Change to the directory containing this script and store the absolute path
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "Current working directory: $(pwd)"
echo "Script directory: $SCRIPT_DIR"

# Load environment variables
source .env

# Set variables
RPC_URL="${RPC_URL:-https://testnet.storyrpc.io}"
PRIVATE_KEY="${PRIVATE_KEY:-e1127ad1d95df1522ad8cc5a8257189e64fe20fa3e2f4492f9f0812e74ca5dfa}"
IP_ASSET_REGISTRY="${IP_ASSET_REGISTRY:-0x1a9d0d28a0422F26D31Be72Edc6f13ea4371E11B}"
REGISTRATION_WORKFLOWS="${REGISTRATION_WORKFLOWS:-0x601C24bFA5Ae435162A5dC3cd166280C471d16c8}"
LICENSE_ATTACHMENT_WORKFLOWS="${LICENSE_ATTACHMENT_WORKFLOWS:-0x96D26F998a56D6Ee34Fb581d26aAEb94e71e3929}"

# List contents of the src directory
echo "Contents of $SCRIPT_DIR/src:"
ls -l "$SCRIPT_DIR/src"

# Check if the IPARegistrar.sol file exists
if [ ! -f "$SCRIPT_DIR/src/IPARegistrar.sol" ]; then
    echo "Error: IPARegistrar.sol not found in $SCRIPT_DIR/src/"
    exit 1
fi

echo "IPARegistrar.sol file found. Proceeding with deployment..."

# Run the forge create command with absolute path
forge create "$SCRIPT_DIR/src/IPARegistrar.sol:IPARegistrar" \
  --constructor-args $IP_ASSET_REGISTRY $REGISTRATION_WORKFLOWS $LICENSE_ATTACHMENT_WORKFLOWS \
  --rpc-url=$RPC_URL \
  --private-key=$PRIVATE_KEY \
  --priority-gas-price=1 \
  --legacy \
  --verify \
  --verifier=blockscout \
  --verifier-url https://testnet.storyscan.xyz/api

# Check if the command was successful
if [ $? -eq 0 ]; then
    echo "IPARegistrar deployed and verified successfully!"
else
    echo "Error: IPARegistrar deployment or verification failed."
fi
