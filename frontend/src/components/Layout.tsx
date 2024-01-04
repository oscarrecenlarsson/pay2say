import { SetStateAction, useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Disclaimer from "./Disclaimer";

import * as S from "./Styles";

import { getConnectedMetaMask } from "../services/metaMask";
import { getContract } from "../services/getContract";
import { getState } from "../services/contractInteractions";
import { initWeb3 } from "../services/initWeb3";

import { ContractState } from "../interfaces/interfaces";
import Web3 from "web3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";

export default function Layout() {
  const [connectedAccount, setConnectedAccount] = useState("");
  const [contractState, setContractState] = useState<ContractState>({
    text: "Nothing to display. Please connect metamask and select the Sepolia testnet.",
    amount: "0",
    creator: "0x0000000000000000000000000000000000000000",
  });

  const [contract, setContract] = useState<any>(undefined);
  const [web3, setWeb3] = useState<Web3<RegisteredSubscription>>();

  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [rollDown, setRollDown] = useState(false);

  const rollDownDisclaimer = () => {
    setShowDisclaimer(true);
    setRollDown(true);
  };

  const getSetConnectedAccount = async () => {
    const acc = await getConnectedMetaMask();
    if (acc) {
      setConnectedAccount(acc);
    }
  };
  const accountListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      await window.ethereum.on(
        "accountsChanged",
        (accounts: SetStateAction<string>[]) => {
          setConnectedAccount(accounts[0]);
        }
      );
    } else {
      console.log("Please install MetaMask");
      setConnectedAccount("");
    }
  };

  const populateContractState = async (
    contract: any,
    web3: any
  ): Promise<void> => {
    try {
      if (contract !== undefined && contract.methods !== undefined) {
        const newState = await getState(contract, web3);
        if (newState) {
          setContractState(newState);
        }
      } else {
        console.error("Contract not initialized or missing required methods");
      }
    } catch (error) {
      console.error("Error in populateContractState:", error);
    }
  };

  useEffect(() => {
    const initPage = () => {
      getSetConnectedAccount();
      accountListener();

      const web3 = initWeb3();
      setWeb3(web3);

      const newContract = getContract(web3);
      if (newContract) {
        setContract(newContract);
        populateContractState(newContract, web3);
      }
    };

    initPage();

    const removeAccountListener = () => {
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        window.ethereum.removeListener("accountsChanged", accountListener);
      }
    };

    return () => {
      removeAccountListener();
    };
  }, []);

  return (
    <S.Body>
      <Header connectedAccount={connectedAccount} contract={contract} />
      {showDisclaimer && (
        <Disclaimer setShowDisclaimer={setShowDisclaimer} rollDown={rollDown} />
      )}
      <S.OutletWrapper>
        <Outlet
          context={{
            contract,
            contractState,
            setContractState,
            connectedAccount,
            populateContractState,
            web3,
          }}
        />
      </S.OutletWrapper>
      <Footer
        showDisclaimer={showDisclaimer}
        rollDownDisclaimer={rollDownDisclaimer}
      />
    </S.Body>
  );
}

export function useStates() {
  return useOutletContext<any>();
}
