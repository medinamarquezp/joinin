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

#### Deployment

- Copy .env.example and rename it to .env
- Set required variables on .env file

```sh
npx ganache-cli
truffle compile
truffle migrate --network (ganache | sepolia)
truffle exec scripts/test-campaigns.js --network (ganache | sepolia)
```

#### Test

Tests all available operations on the contract.

```sh
truffle test
```
