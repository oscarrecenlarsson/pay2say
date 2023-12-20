import { Outlet, useOutletContext } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import * as S from "./Styles";
import { SetStateAction, useEffect, useState } from "react";
import { getConnectedMetaMask } from "../services/metaMask";
import { getContract } from "../services/getContract";
import { getState } from "../services/contractInteractions";
import { ContractState } from "../interfaces/interfaces";
import { initWeb3 } from "../services/initWeb3";

export default function Layout() {
  const [connectedAccount, setConnectedAccount] = useState("");
  const [contractState, setContractState] = useState<ContractState>({
    text: "Nothing to display",
    amount: 0,
    creator: "0x0",
  });

  const [contract, setContract] = useState<any>(undefined);

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

  const populateContractState = async (contract: any): Promise<void> => {
    try {
      if (contract !== undefined && contract.methods !== undefined) {
        const newState = await getState(contract);
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

      const newContract = getContract(web3);
      if (newContract) {
        setContract(newContract);
        populateContractState(newContract);
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
    <>
      <Header connectedAccount={connectedAccount}></Header>
      <S.OutletWrapper>
        <Outlet
          context={{
            contract,
            contractState,
            setContractState,
            connectedAccount,
            populateContractState,
          }}
        />
      </S.OutletWrapper>
      <Footer></Footer>
    </>
  );
}

export function useStates() {
  return useOutletContext<any>();
}
