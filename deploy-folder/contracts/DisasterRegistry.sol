// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./Disaster.sol";
import "./agents/LocalAgent.sol"; // Add this import

contract DisasterRegistry {
    using SafeMath for uint256;

    Disaster[] public disasters;
    uint256 public constant PROXIMITY_THRESHOLD = 50; // 50 km, adjust as needed

    event DisasterCreated(
        uint256 indexed disasterId,
        address disasterContract,
        int256 latitude,
        int256 longitude,
        uint256 timestamp,
        Disaster.AgentType agentType
    );

    event AgentAttachedToDisaster(
        uint256 indexed disasterId,
        address agent,
        Disaster.AgentType agentType
    );

    event LocalAgentCreated(
        address indexed localAgentAddress,
        uint256 indexed disasterId
    );

    function reportDisaster(
        int256 _latitude,
        int256 _longitude,
        uint256 _timestamp,
        Disaster.AgentType _agentType
    ) external {
        uint256 existingDisasterId = findNearbyDisaster(_latitude, _longitude);

        if (existingDisasterId == type(uint256).max) {
            // Create new disaster
            Disaster newDisaster = new Disaster(
                _latitude,
                _longitude,
                _timestamp,
                msg.sender,
                _agentType,
                address(0) // Replace with actual DAO address if needed
            );
            uint256 newDisasterId = disasters.length;
            disasters.push(newDisaster);

            // Create LocalAgent
            LocalAgent localAgent = new LocalAgent(address(this));

            emit DisasterCreated(
                newDisasterId,
                address(newDisaster),
                _latitude,
                _longitude,
                _timestamp,
                _agentType
            );
            emit LocalAgentCreated(address(localAgent), newDisasterId);
        } else {
            // Attach to existing disaster
            disasters[existingDisasterId].attachAgent(msg.sender, _agentType);
            emit AgentAttachedToDisaster(
                existingDisasterId,
                msg.sender,
                _agentType
            );
        }
    }

    function findNearbyDisaster(
        int256 _latitude,
        int256 _longitude
    ) internal view returns (uint256) {
        for (uint256 i = 0; i < disasters.length; i++) {
            Disaster disaster = disasters[i];
            if (
                calculateDistance(
                    _latitude,
                    _longitude,
                    disaster.latitude(),
                    disaster.longitude()
                ) <= PROXIMITY_THRESHOLD
            ) {
                return i;
            }
        }
        return type(uint256).max;
    }

    function calculateDistance(
        int256 lat1,
        int256 lon1,
        int256 lat2,
        int256 lon2
    ) internal pure returns (uint256) {
        // Simplified distance calculation (Haversine formula)
        // Note: This is a rough approximation and doesn't account for Earth's curvature
        int256 dLat = lat2 - lat1;
        int256 dLon = lon2 - lon1;
        return uint256(sqrt((dLat * dLat) + (dLon * dLon)));
    }

    function sqrt(int256 x) internal pure returns (int256 y) {
        int256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function getDisasterCount() external view returns (uint256) {
        return disasters.length;
    }

    function getDisasterContract(
        uint256 _disasterId
    ) external view returns (address) {
        require(_disasterId < disasters.length, "Invalid disaster ID");
        return address(disasters[_disasterId]);
    }
}
