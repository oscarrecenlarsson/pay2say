import { ethers } from "ethers";
import { ContractState } from "../interfaces/interfaces";
import { AbiError } from "web3";

export const getState = async (
  contract: any
): Promise<ContractState | undefined> => {
  if (contract) {
    try {
      const text = await contract.methods.text().call((err: any, res: any) => {
        if (err) {
          console.log("err: ", err);
        }
        return res;
      });

      const unitAmount = await contract.methods
        .amount()
        .call((err: any, res: any) => {
          if (err) {
            console.log("err: ", err);
          }
          return res;
        });

      const amount = Number(unitAmount.toString());

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
  amount: number
) => {
  if (contract) {
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
    } catch (error) {
      console.log(error);
    }
  }
};
