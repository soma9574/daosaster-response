// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AIAgentNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public constant MINT_PRICE = 0.0001 ether; // Price to mint an AI agent NFT
    address public fundWallet; // Wallet to receive funds for disaster relief

    mapping(uint256 => string) private _tokenURIs;

    constructor(address _fundWallet) ERC721("AIAgentNFT", "AIA") {
        fundWallet = _fundWallet;
    }

    function mintAIAgent(string memory _tokenURI) public payable {
        require(msg.value >= MINT_PRICE, "Insufficient payment");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);

        // Transfer funds to the disaster relief fund wallet
        payable(fundWallet).transfer(msg.value);
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _tokenURIs[tokenId];
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function updateFundWallet(address newFundWallet) public onlyOwner {
        fundWallet = newFundWallet;
    }

    // Allow contract to receive ETH
    receive() external payable {}
}
