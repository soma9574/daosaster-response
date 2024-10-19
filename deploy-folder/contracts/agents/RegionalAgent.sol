// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract RegionalAgent is Ownable {
    function monitorRegionalCommunications()
        external
        pure
        returns (string memory)
    {
        return "Monitoring regional communications";
    }

    function reportRegionalDisaster(
        string memory _disasterInfo
    ) external pure returns (string memory) {
        return
            string(
                abi.encodePacked("Reporting regional disaster: ", _disasterInfo)
            );
    }
}
