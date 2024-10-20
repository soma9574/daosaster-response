// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import { IPAssetRegistry } from "@storyprotocol/core/registries/IPAssetRegistry.sol";
import { RegistrationWorkflows } from "@storyprotocol/periphery/workflows/RegistrationWorkflows.sol";
import { WorkflowStructs } from "@storyprotocol/periphery/lib/WorkflowStructs.sol";
import { ISPGNFT } from "@storyprotocol/periphery/interfaces/ISPGNFT.sol";
import { PILFlavors } from "@storyprotocol/core/lib/PILFlavors.sol";
import { ILicenseAttachmentWorkflows } from "@storyprotocol/periphery/interfaces/workflows/ILicenseAttachmentWorkflows.sol";
import { PILTerms } from "@storyprotocol/core/interfaces/modules/licensing/IPILicenseTemplate.sol";

import { SimpleNFT } from "./SimpleNFT.sol";

/// @notice Register an NFT as an IP Account.
contract IPARegistrar {
    IPAssetRegistry public immutable IP_ASSET_REGISTRY;
    RegistrationWorkflows public immutable REGISTRATION_WORKFLOWS;
    ILicenseAttachmentWorkflows public immutable LICENSE_ATTACHMENT_WORKFLOWS;
    SimpleNFT public immutable SIMPLE_NFT;
    ISPGNFT public immutable SPG_NFT;

    string public constant WALRUS_AGGREGATOR = "https://aggregator.walrus-testnet.walrus.space/v1/";

    constructor(address ipAssetRegistry, address registrationWorkflows, address licenseAttachmentWorkflows) {
        IP_ASSET_REGISTRY = IPAssetRegistry(ipAssetRegistry);
        REGISTRATION_WORKFLOWS = RegistrationWorkflows(registrationWorkflows);
        LICENSE_ATTACHMENT_WORKFLOWS = ILicenseAttachmentWorkflows(licenseAttachmentWorkflows);
        // Create a new Simple NFT collection
        SIMPLE_NFT = new SimpleNFT("Disaster Relief NFT", "DIS");
        // Create a new NFT collection via SPG
        SPG_NFT = ISPGNFT(
            REGISTRATION_WORKFLOWS.createCollection(
                ISPGNFT.InitParams({
                    name: "Disaster Relief NFT",
                    symbol: "DIS",
                    baseURI: "https://example.com/",
                    maxSupply: 100,
                    mintFee: 0,
                    mintFeeToken: address(0),
                    mintFeeRecipient: address(this),
                    owner: address(this),
                    mintOpen: true,
                    isPublicMinting: false
                })
            )
        );
    }

    /// @notice Mint an IP NFT and register it as an IP Account via Story Protocol core. Mint Collection is Simple NFT.
    /// @return ipId The address of the IP Account.
    /// @return tokenId The token ID of the IP NFT.
    function mintIp() external returns (address ipId, uint256 tokenId) {
        tokenId = SIMPLE_NFT.mint(msg.sender);
        ipId = IP_ASSET_REGISTRY.register(block.chainid, address(SIMPLE_NFT), tokenId);
    }

    /// @notice Mint an IP NFT and register it as an IP Account via Story Protocol Gateway (periphery).
    /// @dev Requires the collection to be created via SPG (createCollection).
    /// @param blobId The Walrus Blob ID to be used for metadata URIs.
    /// @return ipId The address of the IP Account.
    /// @return tokenId The token ID of the IP NFT.
    /// @return licenseTermsId The ID of the attached license terms.
    function spgMintIp(string calldata blobId) external returns (address ipId, uint256 tokenId, uint256 licenseTermsId) {
        WorkflowStructs.IPMetadata memory metadata = WorkflowStructs.IPMetadata({
            ipMetadataURI: string.concat(WALRUS_AGGREGATOR, blobId),
            ipMetadataHash: keccak256(
                abi.encodePacked(
                    '{"title":"My IP Asset","description":"This is a test IP asset","ipType":"","relationships":[],"createdAt":"","watermarkImg":"","creators":[],"media":[],"attributes":[],"tags":[]}'
                )
            ),
            nftMetadataURI: string.concat(WALRUS_AGGREGATOR, blobId),
            nftMetadataHash: keccak256(
                abi.encodePacked(
                    '{"name":"Test NFT","description":"This is a test NFT","image":"https://picsum.photos/200"}'
                )
            )
        });

        PILTerms memory pilTerms = PILFlavors.commercialRemix({
            mintingFee: 100,
            commercialRevShare: 10,
            royaltyPolicy: address(0x4074CEC2B3427f983D14d0C5E962a06B7162Ab92),
            currencyToken: address(0x91f6F05B08c16769d3c85867548615d270C42fC7)
        });

        return LICENSE_ATTACHMENT_WORKFLOWS.mintAndRegisterIpAndAttachPILTerms(
            address(SPG_NFT),
            msg.sender,
            metadata,
            pilTerms
        );
    }
}