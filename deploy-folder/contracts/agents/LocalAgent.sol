// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract LocalAgent is Ownable {
    function monitorLocalSensors() external pure returns (string memory) {
        return "Monitoring local sensors";
    }

    function reportLocalDisaster(
        string memory _disasterInfo
    ) external pure returns (string memory) {
        return
            string(
                abi.encodePacked("Reporting local disaster: ", _disasterInfo)
            );
    }
}
