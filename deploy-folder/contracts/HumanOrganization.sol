// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract HumanOrganization is Ownable {
    string public name;
    string public expertise;
    string[] public resources;
    bool public isAvailable;

    event TaskAssigned(string task);
    event ResourceAdded(string resource);

    constructor(string memory _name, string memory _expertise) {
        name = _name;
        expertise = _expertise;
        isAvailable = true;
    }

    function assignTask(string memory _task) external onlyOwner {
        require(isAvailable, "Organization is not available");
        emit TaskAssigned(_task);
    }

    function addResource(string memory _resource) external onlyOwner {
        resources.push(_resource);
        emit ResourceAdded(_resource);
    }

    function setAvailability(bool _isAvailable) external onlyOwner {
        isAvailable = _isAvailable;
    }

    function getResources() external view returns (string[] memory) {
        return resources;
    }
}
