// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "../DisasterRegistry.sol";
import "../Disaster.sol";

contract LocalAgent is Ownable {
    struct DroneData {
        uint256 timestamp;
        int256 latitude;
        int256 longitude;
        uint256 altitude;
        string imageDescription;
        string emergencyAnalysis;
    }

    struct ResourceLocation {
        string resourceType;
        int256 latitude;
        int256 longitude;
        string description;
    }

    DroneData public latestDroneData;
    ResourceLocation[] public resourceLocations;
    DisasterRegistry public disasterRegistry;

    event DroneDataUpdated(
        address indexed agent,
        uint256 timestamp,
        int256 latitude,
        int256 longitude,
        uint256 altitude,
        string imageDescription,
        string emergencyAnalysis
    );
    event ResourceLocationAdded(
        address indexed agent,
        string resourceType,
        int256 latitude,
        int256 longitude,
        string description
    );

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

    function updateDroneData(
        int256 _latitude,
        int256 _longitude,
        uint256 _altitude,
        string memory _imageDescription,
        string memory _emergencyAnalysis
    ) external {
        latestDroneData = DroneData({
            timestamp: block.timestamp,
            latitude: _latitude,
            longitude: _longitude,
            altitude: _altitude,
            imageDescription: _imageDescription,
            emergencyAnalysis: _emergencyAnalysis
        });

        emit DroneDataUpdated(
            msg.sender,
            block.timestamp,
            _latitude,
            _longitude,
            _altitude,
            _imageDescription,
            _emergencyAnalysis
        );
    }

    function addResourceLocation(
        string memory _resourceType,
        int256 _latitude,
        int256 _longitude,
        string memory _description
    ) external {
        ResourceLocation memory newResource = ResourceLocation({
            resourceType: _resourceType,
            latitude: _latitude,
            longitude: _longitude,
            description: _description
        });
        resourceLocations.push(newResource);

        emit ResourceLocationAdded(
            msg.sender,
            _resourceType,
            _latitude,
            _longitude,
            _description
        );
    }

    function getResourceLocations()
        external
        view
        returns (ResourceLocation[] memory)
    {
        return resourceLocations;
    }

    function getLatestDroneData() external view returns (DroneData memory) {
        return latestDroneData;
    }

    constructor(address _disasterRegistryAddress) {
        disasterRegistry = DisasterRegistry(_disasterRegistryAddress);
    }

    function reportDisaster(
        int256 _latitude,
        int256 _longitude,
        uint256 _timestamp
    ) external onlyOwner {
        require(
            address(disasterRegistry) != address(0),
            "DisasterRegistry not set"
        );
        try
            disasterRegistry.reportDisaster(
                _latitude,
                _longitude,
                _timestamp,
                Disaster.AgentType.Other
            )
        {
            // Success
        } catch Error(string memory) {
            revert("DisasterRegistry.reportDisaster failed with error");
        } catch {
            revert(
                "DisasterRegistry.reportDisaster failed with low-level error"
            );
        }
    }

    function getDisasterRegistryAddress() public view returns (address) {
        return address(disasterRegistry);
    }
}
