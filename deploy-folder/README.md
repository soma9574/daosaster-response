# SKALE - S2S Tokens 

This project is a core token set that can be used to quickly get up and running with the Europa Hub liquidity.
You will need to manually map the tokens after, however, this will get you started with token deployment and verification for all the tokens according to the naming conventions set by the Europa community.

## Installation
1) Run ```git clone https://github.com/Dirt-Road-Development/skale-s2s-tokens```
2) Run ```./setup.sh```

## How to use

In order to utilize this repository, you must:

1) Have DEPLOYER_ROLE given to the address associated with the private key you provide in the .env file
2) Have sFUEL in the account you are deploying from

## Deployment
1) Run ```npx hardhat deploy --tags <tags> --network <network_name>```

There are plenty of customizable options that will be covered below.

### Deploy USDC

To deploy USDC, you would run the following:

```shell
    # Calypso Mainnet
    npx hardhat deploy --tags usdc --network calypso

    # Calypso Testnet
    npx hardhat deploy --tags usdc --network calypso-staging-v3
```

### Collab.Land Tokens

```shell
    # Calypso Mainnet
    npx hardhat deploy --tags collab --network calypso

    # Calypso Testnet
    npx hardhat deploy --tags collab --network calypso-staging-v3
```
