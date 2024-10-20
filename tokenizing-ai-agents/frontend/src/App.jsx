import React from 'react';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import MintNFT from './components/MintNFT';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="w-full p-4 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-2">
          <div className="w-1/3"></div>
          <h1 className="text-4xl font-bold text-center w-1/3">Tokenize the AI Agents for Better Good</h1>
          <div className="w-1/3 flex justify-end">
            <DynamicWidget />
          </div>
        </div>
        <p className="text-xl text-gray-600 italic">
          "Tokenize from drones to Omi gel (friend)"
        </p>
      </header>
      <main className="flex-grow flex justify-center items-center">
        <MintNFT />
      </main>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
