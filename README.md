# pay2say

Frontend is deployed on Github Pages.  
Contract is deployed to the Sepolia testnet.  
CI/CD pipelines are set up for frontend with github actions

If you want to run things locally:   
You need to change the contract address in the config to match the locally deployed version   
and also change the way the Web3 object gets initialized so that it talks to the local port  
also set up MetaMask with the local test network and import wallets from there.

Open up 3 terminal windows  
cd frontend run npm start  
cd contracts run npx hardhat node  
cd contracts run npx hardhat run --network localhost scripts/deploy.ts
