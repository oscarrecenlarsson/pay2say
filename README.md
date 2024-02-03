If you want to know more about the project go to the deployed project:
https://oscarrecenlarsson.github.io/pay2say/

The frontend is deployed on Github Pages.  
The contract is deployed to the Sepolia testnet.  
CI/CD pipelines are set up for frontend with Github Actions

If you want to try it out you need:
- The MetaMask browser extension
- Sepolia ETH, you can get it from https://sepoliafaucet.com/
- To select the Sepolia Network in MetaMask

If you want to run things locally:   
- Change the contract address in the config to match the locally deployed version
- Make sure that the Web3 object gets initialized so that it talks to the local port  
- Set up MetaMask with the local test network and import wallets from there.
- Open up 3 terminal windows and run the following commands  
- cd frontend run npm start  
- cd contracts run npx hardhat node  
- cd contracts run npx hardhat run --network localhost scripts/deploy.ts
