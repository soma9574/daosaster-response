#!/bin/bash

# Set variables
UPLOAD_FILE="logo_coin.png"
OUTPUT_FILE="walrus_response.txt"
WALRUS_URL="https://publisher.walrus-testnet.walrus.space/v1/store?epochs=5"

# Check if the file to upload exists
if [ ! -f "${UPLOAD_FILE}" ]; then
    echo "Error: File ${UPLOAD_FILE} not found."
    exit 1
fi

# Run the curl command and store the output
if curl -X PUT "${WALRUS_URL}" --upload-file "${UPLOAD_FILE}" > "${OUTPUT_FILE}" 2>/dev/null; then
    echo "File uploaded successfully. Response stored in ${OUTPUT_FILE}"
    echo "Blob ID:"
    cat "${OUTPUT_FILE}"
else
    echo "Error: File upload failed."
    exit 1
fi