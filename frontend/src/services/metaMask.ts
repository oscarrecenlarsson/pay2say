export const connectMetaMask = async () => {
  if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log("Please install MetaMask");
  }
};

export const getConnectedMetaMask = async () => {
  if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        return accounts[0];
      } else {
        console.log("Connect to MetaMask using the Connect button");
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log("Please install MetaMask");
  }
};
