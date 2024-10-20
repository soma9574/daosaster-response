#!/bin/bash

# Set variables
RPC_URL="https://testnet.storyrpc.io"
PRIVATE_KEY="e1127ad1d95df1522ad8cc5a8257189e64fe20fa3e2f4492f9f0812e74ca5dfa"
IP_ASSET_REGISTRY="0x1a9d0d28a0422F26D31Be72Edc6f13ea4371E11B"
REGISTRATION_WORKFLOWS="0x601C24bFA5Ae435162A5dC3cd166280C471d16c8"
LICENSE_ATTACHMENT_WORKFLOWS="0x96D26F998a56D6Ee34Fb581d26aAEb94e71e3929"

# Run the forge create command
forge create src/IPARegistrar.sol:IPARegistrar \
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
