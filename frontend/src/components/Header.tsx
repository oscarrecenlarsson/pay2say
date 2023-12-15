import { NavLink } from "react-router-dom";
import * as S from "./Styles";

export default function Header() {
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
        <S.ConnectBtn>Connect Wallet</S.ConnectBtn>
      </S.Header>
    </>
  );
}
