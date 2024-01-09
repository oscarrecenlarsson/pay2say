import { ethers } from "ethers";
import { ContractState } from "../interfaces/interfaces";
import { AbiError, Address } from "web3";

export const getState = async (
  contract: any,
  web3: any
): Promise<ContractState | undefined> => {
  if (contract) {
    try {
      const text = await contract.methods.text().call((err: any, res: any) => {
        if (err) {
          console.log("err: ", err);
        }
        return res;
      });

      const amountInWei = await contract.methods
        .amount()
        .call((err: any, res: any) => {
          if (err) {
            console.log("err: ", err);
          }
          return res;
        });

      const amount = web3.utils.fromWei(amountInWei, "ether");

      const creator = await contract.methods
        .creator()
        .call((err: any, res: any) => {
          if (err) {
            console.log("err: ", err);
          }
          return res;
        });

      const state: ContractState = { text, amount, creator };

      return state;
    } catch (error) {
      if (
        error instanceof TypeError &&
        error.message.includes("Failed to fetch")
      ) {
        console.log(error);
        console.log(error);
        console.error(
          "Failed to connect to the contract.If you are running a local Hardhat node, make sure the hardhat server is running and that the contract is deployed to it. To run the server cd into contracts and run npx hardhat node"
        );
      } else if (
        error instanceof AbiError &&
        error.message.includes("Parameter decoding error")
      ) {
        console.log(error);
        console.error(
          "Failed to connect to the contract. If you are running a local Hardhat node, make sure that the contract is deployed to the hardhat node. Open a new terminal, cd into contracts and run npx hardhat run --network localhost scripts/deploy.ts"
        );
      } else {
        console.error(error);
      }
    }
  }
};

export const updateState = async (
  contract: any,
  connectedAccount: string,
  text: string,
  amount: string
) => {
  if (!contract) {
    throw new Error("Contract is not initialized.");
  }

  if (!connectedAccount) {
    throw new Error("No connected account found. Please connect your wallet.");
  }

  try {
    await contract.methods
      .updateState(text)
      .send({
        value: ethers.parseEther(amount.toString()),
        from: connectedAccount,
      })
      .once("receipt", async (receipt: any) => {
        console.log(receipt);
      });
  } catch (error: any) {
    console.log(error);
    if (error.message.includes("User denied transaction signature")) {
      throw new Error("User denied transaction signature");
    }
  }
};

export const getBalance = async (contract: any, web3: any) => {
  try {
    const balance = await web3.eth.getBalance(contract.options.address);
    return web3.utils.fromWei(balance, "ether");
  } catch (error) {
    console.error("Error fetching contract balance: ", error);
    return 0;
  }
};

export const withdraw = async (contract: any, connectedAccount: Address) => {
  try {
    await contract.methods.withdraw().send({ from: connectedAccount });
  } catch (error: any) {
    if (error.message.includes("User denied transaction signature")) {
      throw new Error("User denied transaction signature");
    }
    console.error("Error during withdrawal: ", error);
  }
};

export const getContractOwner = async (contract: any) => {
  try {
    const contractOwner = await contract.methods
      .contractOwner()
      .call((err: any, res: any) => {
        if (err) {
          console.log("err: ", err);
        }
        return res;
      });
    return contractOwner.toLowerCase();
  } catch (error) {
    console.error("Error fetching contract owner: ", error);
    return null;
  }
};
