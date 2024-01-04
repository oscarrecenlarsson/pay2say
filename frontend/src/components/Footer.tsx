import * as S from "./Styles";

interface FooterProps {
  rollDownDisclaimer: () => void;
}

export default function Footer(props: FooterProps) {
  const handleClick = () => {
    props.rollDownDisclaimer();
  };

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
