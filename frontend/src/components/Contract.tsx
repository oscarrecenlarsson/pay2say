import * as S from "./Styles";
import { useStates } from "./Layout";

export default function Contract() {
  const { contractState } = useStates();

  return (
    <>
      <S.Contract>
        <h2>Contract</h2>
        <p>Text: {contractState.text}</p>
        <p>Amount: {contractState.amount} Wei</p>
        <p>Creator: {contractState.creator}</p>
      </S.Contract>
    </>
  );
}
