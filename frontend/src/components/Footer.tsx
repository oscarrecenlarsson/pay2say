import * as S from "./Styles";

interface FooterProps {
  rollDownDisclaimer: () => void;
  showDisclaimer: boolean;
}

export default function Footer(props: FooterProps) {
  const handleClick = () => {
    props.rollDownDisclaimer();
  };

  if (props.showDisclaimer) {
    return (
      <>
        <S.Footer>
          <p>Welcome to Pay2Say.</p>
        </S.Footer>
      </>
    );
  }

  return (
    <>
      <S.Footer>
        <p>
          Engaging with this site means agreeing to our terms. Click{" "}
          <S.ClickHere onClick={handleClick}>here</S.ClickHere> to see the full
          disclaimer.
        </p>
      </S.Footer>
    </>
  );
}
