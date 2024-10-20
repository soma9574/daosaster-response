import React from 'react'

const IPCard = ({ name, imageId, onMint }) => {
  const imageUrl = `https://aggregator.walrus-testnet.walrus.space/v1/${imageId}`

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl} alt={name} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">{name}</h3>
        <div className="flex justify-between">
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded"
            onClick={onMint}
          >
            Mint
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded">
            Remix
          </button>
        </div>
      </div>
    </div>
  )
}

export default IPCard
