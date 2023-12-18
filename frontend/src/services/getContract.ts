import { RegisteredSubscription } from "web3-eth";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config";
import Web3 from "web3";

export const getContract = (web3: Web3<RegisteredSubscription>) => {
  try {
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
