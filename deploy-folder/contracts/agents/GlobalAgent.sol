// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract GlobalAgent is Ownable {
    function monitorGlobalNews() external pure returns (string memory) {
        return "Monitoring global news sources";
    }

    function reportGlobalDisaster(
        string memory _disasterInfo
    ) external pure returns (string memory) {
        return
            string(
                abi.encodePacked("Reporting global disaster: ", _disasterInfo)
            );
    }
}
