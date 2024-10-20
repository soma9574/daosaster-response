import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { getSigner } from "@dynamic-labs/ethers-v6";
import { AIAgentNFT_ADDRESS, AIAgentNFT_ABI } from '../constants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MintNFT() {
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState(null);
  const [contractBalance, setContractBalance] = useState('0');
  const { primaryWallet } = useDynamicContext();
  const [nftMinted, setNftMinted] = useState(false);
  const [transactionCount, setTransactionCount] = useState(0);

//   useEffect(() => {
//     fetchContractBalance();
//   }, []);

//   const fetchContractBalance = async () => {
//     try {
//       const provider = new ethers.providers.JsonRpcProvider(
//         'https://rpc-quicknode-holesky.morphl2.io'
//       ) 
//       const contract = new ethers.Contract(AIAgentNFT_ADDRESS, AIAgentNFT_ABI, provider);
//       const balance = await provider.getBalance(AIAgentNFT_ADDRESS);
//       console.log("Contract balance:", balance);

//       setContractBalance(ethers.utils.formatEther(balance));
//     } catch (err) {
//       console.error("Error fetching contract balance:", err);
//     }
//   };

  const mintNFT = async () => {
    if (!primaryWallet) {
      toast.error("Please connect your wallet first");
      return;
    }

    setMinting(true);
    setError(null);
    setNftMinted(false);

    const toastId = toast.loading("Initiating NFT minting process...");

    try {
      const signer = await getSigner(primaryWallet);
      const contract = new ethers.Contract(AIAgentNFT_ADDRESS, AIAgentNFT_ABI, signer);

      const tokenURI = "ipfs://QmYuKY45Aq87LeL1R5dhb1hqHLp6ZFbLMnixZYxiiQvi1m";
      const mintPrice = ethers.parseEther("0.0001");

      toast.update(toastId, { render: "Sending transaction...", type: "info", isLoading: true });
      const tx = await contract.mintAIAgent(tokenURI, { value: mintPrice });
      
      toast.update(toastId, { render: "Transaction sent. Waiting for confirmation...", type: "info", isLoading: true });
      await tx.wait();

      setNftMinted(true);
      setTransactionCount(prevCount => prevCount + 1);
      toast.update(toastId, { render: "NFT minted successfully!", type: "success", isLoading: false, autoClose: 5000 });
    } catch (err) {
      console.error("Minting error:", err);
      setError(`Failed to mint NFT: ${err.message}`);
      toast.update(toastId, { render: `Failed to mint NFT: ${err.message}`, type: "error", isLoading: false, autoClose: 5000 });
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="relative h-screen w-full">
      {/* <div className="absolute top-4 left-4 bg-gray-800 text-white p-2 rounded">
        Contract Balance: {contractBalance} ETH
      </div> */}
      <div className="flex justify-center items-center h-full">
        <img
          src={nftMinted ? "../wonder.png" : "../hi.webp"}
          alt="Mint NFT"
          onClick={mintNFT}
          className={`w-64 h-64 cursor-pointer ${minting ? 'opacity-50' : 'hover:opacity-80'} ${
            nftMinted ? 'animate-spin-slow' : ''
          }`}
          style={{ pointerEvents: minting || !primaryWallet ? 'none' : 'auto' }}
        />
      </div>
      {error && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-2 rounded">
          {error}
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default MintNFT;
