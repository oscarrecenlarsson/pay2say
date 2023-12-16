import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import * as S from "./Styles";
import { SetStateAction, useEffect, useState } from "react";
import { getConnectedMetaMask } from "../services/metaMask";

export const Layout = () => {
  // add context={} to Outlet?

  const [connectedAccount, setConnectedAccount] = useState("");

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

  useEffect(() => {
    const initPage = () => {
      getSetConnectedAccount();
      accountListener();
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
        <Outlet />
      </S.OutletWrapper>
      <Footer></Footer>
    </>
  );
};
