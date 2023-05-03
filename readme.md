# ✍️ join.in

Be part of the change in a decentralized and transparent way. Join in.

## Prerequisites

- Node JS installed: https://nodejs.org/en/download/
- Truffle suite installed: https://trufflesuite.com/docs/truffle/how-to/install/

## Testnet network

### Sepolia (testnet) information

- **Network:** Ethereum Sepolia
- **Chain ID:** 11155111
- **Currency symbol:** ETH
- **Block explorer:** https://sepolia.etherscan.io/
- **Faucet:** https://sepolia-faucet.pk910.de/

### Polygon Mumbai (testnet) information

- **Network:** Polygon Mumbai
- **New RPC URL:** https://rpc-mumbai.maticvigil.com/
- **Chain ID:** 80001
- **Currency symbol:** MATIC
- **Block explorer:** https://mumbai.polygonscan.com/
- **Faucet:** https://faucet.polygon.technology/

More info here: https://wiki.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/

#### Deployment

- Copy .env.example and rename it to .env
- Set required variables on .env file

```sh
npx ganache-cli
truffle compile
truffle migrate --network (ganache | sepolia | mumbai)
truffle exec scripts/test-campaigns.js --network (ganache | sepolia | mumbai)
truffle run verify Campaigns --network (sepolia | mumbai)
```

#### Test

Tests all available operations on the contract.

```sh
truffle test
```
