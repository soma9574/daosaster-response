// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Individual is Ownable {
    string public name;
    string public skills;
    bool public isAvailable;

    event TaskAssigned(string task);

    constructor(string memory _name, string memory _skills) {
        name = _name;
        skills = _skills;
        isAvailable = true;
    }

    function assignTask(string memory _task) external onlyOwner {
        require(isAvailable, "Individual is not available");
        emit TaskAssigned(_task);
    }

    function setAvailability(bool _isAvailable) external onlyOwner {
        isAvailable = _isAvailable;
    }
}
