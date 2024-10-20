import React, { useState } from 'react';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import MintNFT from './components/MintNFT';
import IPComponent from './components/IPComponent'; // Assume this component exists
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="w-full p-4 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">DAOsaster</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button
                  className={`px-4 py-2 rounded-md ${selectedOption === 'tokenize' ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-100'}`}
                  onClick={() => setSelectedOption('ip')}
                >
                  IP it
                </button>
              </li>
              <li>
                <button
                  className={`px-4 py-2 rounded-md ${selectedOption === 'ip' ? 'bg-green-500 text-white' : 'text-green-500 hover:bg-green-100'}`}
                  onClick={() => setSelectedOption('tokenize')}
                >
                  Tokenize it
                </button>
              </li>
            </ul>
          </nav>
          <DynamicWidget />
        </div>
      </header>
      <main className="flex-grow container mx-auto mt-8">
        {selectedOption === 'tokenize' && <MintNFT />}
        {selectedOption === 'ip' && <IPComponent />}
        {!selectedOption && (
          <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Welcome to DAOsaster</h2>
            <p className="text-xl text-gray-700 mb-6">Your gateway to tokenization and IP management</p>
            <p className="text-lg text-gray-600">Select an option  to get started</p>
            <div className="mt-8 flex justify-center space-x-4">
              <button
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
                onClick={() => setSelectedOption('ip')}
              >
                IP it
              </button>
              <button
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300"
                onClick={() => setSelectedOption('tokenize')}
              >
                Tokenize it
              </button>
            </div>
          </div>
        )}
      </main>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
