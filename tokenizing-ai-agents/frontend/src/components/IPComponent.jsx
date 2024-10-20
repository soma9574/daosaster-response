import React from 'react'
import IPCard from './IPCard'
// Import the necessary client


const IPComponent = () => {
  
  const ipList = [
    { id: 1, name: 'IP 1', image: 'KG6wYE2EAsZcPwStMNhfTbsSak27jOvBUz86vIpBxdI' },
    { id: 2, name: 'IP 2', image: '_E_5VTJJEE4O-TaMca0N5TRMoD4u6vUPgqdlnB667fQ' },
    { id: 3, name: 'IP 3', image: '7zJR7Iv1JSUcpklVCuXWhBRRj5nUBws4HhGmFHuAFlk' },
    
  ]

  const handleMint = async () => {
    try {
      const response = await client.license.mintLicenseTokens({
        licenseTermsId: "1",
        licensorIpId: "0xC92EC2f4c86458AFee7DD9EB5d8c57920BfCD0Ba",
        receiver: "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
        amount: 1,
        txOptions: { waitForTransaction: true }
      });

      console.log(`License Token minted at transaction hash ${response.txHash}, License IDs: ${response.licenseTokenIds}`);
      // You might want to add some user feedback here, like a toast notification
    } catch (error) {
      console.error("Error minting license token:", error);
      // Handle the error, maybe show an error message to the user
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">IP List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ipList.map((ip) => (
          <IPCard 
            key={ip.id} 
            name={ip.name} 
            imageId={ip.image} 
            onMint={handleMint}
          />
        ))}
      </div>
    </div>
  )
}

export default IPComponent
