import styled from "styled-components";

export const OutletWrapper = styled.main`
  // - sum of header and footer height
  min-height: calc(100vh - 128px);
  min-width: 600px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15%;
  background-color: papayawhip;
  overflow-y: auto;

  @media (max-width: 992px) {
    flex-direction: column;
    padding-top: 20px;
    padding-bottom: 84px;
    gap: 20px;
  }
`;

export const Header = styled.header`
  height: 64px;
  width: 100%;
  min-width: 600px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: grey;
`;

export const Nav = styled.nav`
  height: 100%;
  width: 50%;

  ul {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style-type: none;

    li {
      height: 100%;
      width: 64px;
      background-color: red;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    li a {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: black;
      text-decoration: none;
      background-color: aqua;

      &.active {
        text-decoration: underline;
      }
    }
  }
`;

export const Logo = styled.h3`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin-left: 20px;
  padding: 0px;

  a {
    color: black;
    text-decoration: none;
    padding: 0px;
    margin: 0;
  }
`;

export const ConnectBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: yellow;
  font-size: 1rem;
  padding: 10px;
  white-space: nowrap;
  margin-right: 20px;
  cursor: pointer;
`;

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  height: 64px;
  width: 100%;
  min-width: 600px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: grey;
`;

export const Form = styled.form`
  height: 600px;
  width: 400px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: blue;
  margin-top: 20px;
  margin-bottom: 84px;

  @media (max-width: 992px) {
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;

export const Contract = styled.div`
  height: 400px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: red;
`;

export const Text = styled.div`
  height: 600px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: green;
  margin-top: 20px;
  margin-bottom: 84px;

  @media (max-width: 992px) {
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;

export const Image = styled.div`
  height: 400px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: purple;
`;
