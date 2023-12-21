import Web3 from "web3";

export const initWeb3 = () => {
  if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
    const web3 = new Web3(window.ethereum);
    return web3;
  } else {
    const web3 = new Web3("http://localhost:8545");
    return web3;
  }
};
