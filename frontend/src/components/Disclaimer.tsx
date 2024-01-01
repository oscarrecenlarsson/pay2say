import { useState } from "react";
import * as S from "./Styles";

interface DisclaimerProps {
  setShowDisclaimer: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Disclaimer(props: DisclaimerProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleDisclaimerConfirm = () => {
    if (isChecked) {
      setAnimate(true);
      setTimeout(() => {
        props.setShowDisclaimer(false);
      }, 2000);
    } else {
      alert("Please agree to the terms before proceeding.");
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <S.Disclaimer className={animate ? "roll-up" : ""}>
        <S.DisclaimerText>
          <h2>Disclaimer</h2>
          <h3>Viewer discretion is advised</h3>
          Welcome to Pay2Say, where the classic concept of free speech meets the
          world of Web3 technology. This websites displays the contents of a
          smart contract that holds a short text. Given that the text could be
          anything, and we really mean anything, this website can not take any
          resposibility for what is displayed. The content displayed on our
          platform is a reflection of an individual user's views and does not
          represent the opinions or values of the site itself. Access to this
          platform is restricted to individuals who are 18 years of age or
          older. This age requirement is in place to guarantee that users have
          the maturity and understanding necessary to engage with and contribute
          to this open and unrestricted smart contract. By using this service,
          you confirm that you meet this age criterion and are legally capable
          of agreeing to these terms.
          <S.CheckboxContainer>
            <input
              type="checkbox"
              id="agreeTermsCheckbox" // Adding an id here
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <S.ClickableLabel htmlFor="agreeTermsCheckbox">
              I agree to these terms and conditions.
            </S.ClickableLabel>{" "}
          </S.CheckboxContainer>
          {<S.Btn onClick={handleDisclaimerConfirm}>Enter Site</S.Btn>}
        </S.DisclaimerText>
      </S.Disclaimer>
    </>
  );
}
