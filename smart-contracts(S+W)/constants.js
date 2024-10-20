module.exports = {
    CONTRACT_ADDRESS: "0xba456adabeC5E89E61CF20f2697A39F8b8c47CB2",
    BLOB_ID: "KG6wYE2EAsZcPwStMNhfTbsSak27jOvBUz86vIpBxdI",
    ABI: [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "blobId",
            "type": "string"
          }
        ],
        "name": "spgMintIp",
        "outputs": [
          {
            "internalType": "address",
            "name": "ipId",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "licenseTermsId",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
  };
