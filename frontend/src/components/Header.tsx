import { NavLink } from "react-router-dom";
import { connectMetaMask } from "../services/metaMask";
import * as S from "./Styles";
import { getContractOwner } from "../services/contractInteractions";
import { useEffect, useState } from "react";

interface HeaderProps {
  connectedAccount: string;
  contract: any;
}

export default function Header({ connectedAccount, contract }: HeaderProps) {
  const [adminAccount, setAdminAccount] = useState("");

  useEffect(() => {
    const fetchAdminAccount = async () => {
      if (contract) {
        const owner = await getContractOwner(contract);
        setAdminAccount(owner);
      }
    };

    fetchAdminAccount();
  }, [contract]);

  return (
    <>
      <S.Header>
        <S.Logo>
          <NavLink to={"/"}>
            <img
              src="/assets/pay2sayLogo.png"
              alt="Pay2Say Logo"
              width="54"
              height="54"
            ></img>
          </NavLink>
        </S.Logo>

        <S.Nav>
          <ul>
            <li>
              <NavLink to={"/"}>HOME</NavLink>
            </li>
            <li>
              <NavLink to={"/about"}>ABOUT</NavLink>
            </li>
            <li>
              <NavLink to={"/nft"}>NFT</NavLink>
            </li>
            {connectedAccount === adminAccount && (
              <li>
                <NavLink to={"/admin"}>ADMIN</NavLink>
              </li>
            )}
          </ul>
        </S.Nav>
        <S.ConnectBtn onClick={connectMetaMask}>
          {connectedAccount && connectedAccount.length > 0
            ? `Connected: ${connectedAccount.substring(
                0,
                6
              )}...${connectedAccount.substring(38)}`
            : "Connect Wallet"}
        </S.ConnectBtn>
      </S.Header>
    </>
  );
}
