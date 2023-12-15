import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import * as S from "./Styles";

export const Layout = () => {
  // logic for connecting metamask?
  // add context={} to Outlet?

  return (
    <>
      <Header></Header>
      <S.OutletWrapper>
        <Outlet />
      </S.OutletWrapper>
      <Footer></Footer>
    </>
  );
};
