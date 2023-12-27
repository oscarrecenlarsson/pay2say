import styled from "styled-components";

const primaryDark = "#1C1C1C";
const primaryLight = "#383838";

const secondaryDark = "#646464";
const secondaryLight = "#D9D9D9";

const interactiveNormal = "#64FFDA";
const interactiveHover = "#C0C0C0";

export const Body = styled.body`
  font-family: Arial, Helvetica, sans-serif;
`;

export const OutletWrapper = styled.main`
  min-height: calc(100vh - 128px);
  min-width: 600px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15%;
  overflow-y: auto;
  margin-top: 64px;
  background: repeating-linear-gradient(
    135deg,
    ${primaryDark},
    ${primaryDark} 40px,
    black 40px,
    black 80px
  );

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
  background-color: ${secondaryDark};
  position: fixed;
  top: 0;
  z-index: 100;
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
      transition: background-color 0.3s, color 0.3s;

      &:hover {
        background-color: ${interactiveHover};
        color: ${primaryDark};
      }

      &.active {
        color: ${primaryDark};
        background-color: ${interactiveNormal};
        text-decoration: underline;
      }
    }
  }
`;

export const Logo = styled.div`
  height: 64px;
  width: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;

  a {
    text-decoration: none;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ConnectBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${interactiveNormal};
  color: ${primaryDark};
  font-size: 1rem;
  padding: 10px;
  white-space: nowrap;
  margin-right: 20px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${interactiveHover};
    color: ${primaryDark};
  }
`;

export const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${interactiveNormal};
  color: ${primaryDark};
  font-size: 1rem;
  padding: 10px;
  white-space: nowrap;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${interactiveHover};
    color: ${primaryDark};
  }
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
  color: black;
  background-color: ${secondaryDark};
`;

export const Form = styled.form`
  box-sizing: border-box;
  height: 600px;
  width: 400px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${secondaryLight};
  margin-top: 84px;
  margin-bottom: 84px;
  border-radius: 15px;
  border: 5px solid ${interactiveNormal};

  p {
    padding-left: 20px;
    padding-right: 20px;
  }

  @media (max-width: 992px) {
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;

export const Contract = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 600px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  color: white;
  background-image: url(/assets/contractBackground.png);
  background-size: cover;
  border-radius: 15px;
  border: 5px solid white;
  padding-left: 20px;
  padding-right: 20px;

  h2 {
    margin-bottom: 5px;
  }

  h3 {
    font-size: 1.75rem;
    font-weight: 400;
    margin-bottom: 5px;
  }

  p {
    margin: 0;
    color: ${interactiveNormal};
  }
`;

export const FullAddress = styled.span`
  display: none;
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
  left: 100%;
  transition: transform 0.3s ease-in-out;
  align-self: flex-end;
  cursor: pointer;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const ShortAddress = styled.span`
  display: inline-block;
  cursor: pointer;
  align-self: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const ContractHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-top: 10px;

  width: 100%;
  font-size: 0.75rem;
  font-weight: bold;
  color: ${interactiveNormal};

  &:hover ${FullAddress} {
    display: inline-block;
    transform: translateX(-100%);
  }

  &:hover ${ShortAddress} {
    display: none;
  }
`;

export const Amount = styled.span`
  font-size: 1.125rem;
  font-weight: bold;
`;

export const Creator = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

export const Adress = styled.span`
  font-size: 1rem;
  font-weight: 400;
`;

export const Text = styled.div`
  box-sizing: border-box;
  height: 600px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${secondaryLight};
  margin-top: 20px;
  margin-bottom: 84px;

  padding-left: 20px;
  padding-right: 20px;

  border-radius: 15px;
  border: 5px solid ${primaryLight};

  @media (max-width: 992px) {
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;

export const DisclaimerText = styled.div`
  box-sizing: border-box;
  height: 600px;
  width: 500px;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${secondaryLight};
  margin-top: 20px;
  margin-bottom: 84px;

  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;

  border-radius: 15px;
  border: 5px solid ${primaryLight};

  h2,
  h3 {
    margin-top: 0;
    margin-bottom: 0;
  }

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
  background-color: ${primaryDark};
  border-radius: 15px;
  background-color: transparent;

  img {
    border-radius: 15px;
  }
`;

export const Disclaimer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: calc(100vh - 128px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
  z-index: 100;
  background: repeating-linear-gradient(
    135deg,
    #e4d230,
    #e4d230 40px,
    ${primaryDark} 40px,
    ${primaryDark} 80px
  );
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const ClickableLabel = styled.label`
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 5px;
  padding-right: 5px;
`;

export const CheckboxContainer = styled.div`
  //margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: start;

  input[type="checkbox"] {
    appearance: none; // Removes default styling
    -webkit-appearance: none; // Removes default styling for webkit browsers
    background-color: #fff; // Default background
    border: 1px solid #ddd; // Default border
    padding: 9px; // Adjust size as needed
    border-radius: 3px; // Optional: for rounded corners
    display: inline-block;
    position: relative;
    margin-right: 10px;
    cursor: pointer;

    &:checked {
      background-color: ${interactiveNormal};
      border-color: ${interactiveNormal};
    }

    &:checked:after {
      content: "✔";
      position: absolute;
      top: -2px;
      left: 2px;
      color: black;
      font-size: 18px;
    }
  }

  label {
    cursor: pointer;
    font-size: 1rem;
  }
`;

export const CopiedNotification = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  color: white;
  padding: 8px;
  border-radius: 4px;
  font-size: 0.8rem;
`;
