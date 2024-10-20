// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AIAgentNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public constant MINT_PRICE = 0.0001 ether; 
    address public fundWallet;

    struct AgentType {
        string name;
        uint256 maxSupply;
    }

    struct Agent {
        uint256 agentTypeId;
        string tokenURI;
    }

    AgentType[] public agentTypes;
    mapping(uint256 => Agent) private _agents;
    mapping(uint256 => uint256) private _agentTypeSupply;

    constructor(
        address _fundWallet,
        string[] memory _agentTypeNames,
        uint256[] memory _agentTypeMaxSupplies
    ) ERC721("AIAgentNFT", "AIA") {
        require(_agentTypeNames.length == _agentTypeMaxSupplies.length, "Mismatched input arrays");
        fundWallet = _fundWallet;

        for (uint256 i = 0; i < _agentTypeNames.length; i++) {
            agentTypes.push(AgentType(_agentTypeNames[i], _agentTypeMaxSupplies[i]));
        }
    }

    function mintAIAgent() public payable {
        require(msg.value >= MINT_PRICE, "Insufficient payment");

        uint256 agentTypeId = _getRandomAvailableAgentType();
        require(agentTypeId < agentTypes.length, "No available agent types");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);

        string memory tokenURI = _generateTokenURI(agentTypeId, _agentTypeSupply[agentTypeId]);
        _agents[newTokenId] = Agent(agentTypeId, tokenURI);
        _agentTypeSupply[agentTypeId]++;

        payable(fundWallet).transfer(msg.value);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _agents[tokenId].tokenURI;
    }

    function getAgentType(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return agentTypes[_agents[tokenId].agentTypeId].name;
    }

    function getAgentTypeSupply(uint256 agentTypeId) public view returns (uint256) {
        require(agentTypeId < agentTypes.length, "Invalid agent type ID");
        return _agentTypeSupply[agentTypeId];
    }

    function getAgentTypesCount() public view returns (uint256) {
        return agentTypes.length;
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function updateFundWallet(address newFundWallet) public onlyOwner {
        fundWallet = newFundWallet;
    }

    // Allow contract to receive ETH
    receive() external payable {}

    function _getRandomAvailableAgentType() private view returns (uint256) {
        uint256[] memory availableTypes = new uint256[](agentTypes.length);
        uint256 count = 0;

        for (uint256 i = 0; i < agentTypes.length; i++) {
            if (_agentTypeSupply[i] < agentTypes[i].maxSupply) {
                availableTypes[count] = i;
                count++;
            }
        }

        if (count == 0) {
            return agentTypes.length; // No available types
        }

        uint256 randomIndex = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % count;
        return availableTypes[randomIndex];
    }

    function _generateTokenURI(uint256 agentTypeId, uint256 supply) private view returns (string memory) {
        
        return string(abi.encodePacked(
            "https://publisher.walrus-testnet.walrus.space/",
            agentTypes[agentTypeId].name,
            "/",
            toString(supply + 1)
        ));
    }

    function toString(uint256 value) private pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
