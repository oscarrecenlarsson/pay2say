import * as S from "./Styles";

interface DisclaimerProps {
  setShowDisclaimer: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Disclaimer(props: DisclaimerProps) {
  const handleDisclaimerConfirm = () => {
    props.setShowDisclaimer(false);
  };

  return (
    <>
      <S.Disclaimer>
        <S.Text>
          This is a disclaimer. Please read and confirm.
          {<button onClick={handleDisclaimerConfirm}>I Agree</button>}
        </S.Text>
      </S.Disclaimer>
    </>
  );
}
