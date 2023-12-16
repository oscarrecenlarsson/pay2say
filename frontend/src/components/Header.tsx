import { NavLink } from "react-router-dom";
import { connectMetaMask } from "../services/metaMask";
import * as S from "./Styles";

interface HeaderProps {
  connectedAccount: string;
}

export default function Header({ connectedAccount }: HeaderProps) {
  return (
    <>
      <S.Header>
        <S.Logo>
          <NavLink to={"/"}>Pay2Say</NavLink>
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
