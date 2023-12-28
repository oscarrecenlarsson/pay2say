import * as S from "./Styles";
import { useStates } from "./Layout";
import { CONTRACT_ADDRESS } from "../config";
import { useState } from "react";

export default function Contract() {
  const { contractState } = useStates();

  const splitPosition = Math.ceil((contractState.creator.length - 4) / 2);
  const part1 = contractState.creator.substring(0, splitPosition);
  const part2 = contractState.creator.substring(splitPosition);

  const [showCopiedNotification, setShowCopiedNotification] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setShowCopiedNotification(true);
        setTimeout(() => setShowCopiedNotification(false), 2000); // Hide after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <>
      <S.Contract>
        {showCopiedNotification && (
          <S.CopiedNotification>Copied to clipboard!</S.CopiedNotification>
        )}
        <S.ContractHeaderWrapper>
          <img
            src="/assets/ethLogo.png"
            alt="Pay2Say Logo"
            width="45px"
            height="45px"
          ></img>
          <S.FullAddress onClick={() => copyToClipboard(CONTRACT_ADDRESS)}>
            {CONTRACT_ADDRESS}
          </S.FullAddress>
          <S.ShortAddress>...{CONTRACT_ADDRESS.slice(-6)}</S.ShortAddress>
        </S.ContractHeaderWrapper>
        <h3>
          <b>{contractState.text}</b>
        </h3>

        <h5>
          <S.Amount>{contractState.amount} WEI</S.Amount>
          <br />
          <br />
          <br />
          <S.Creator>Creator:</S.Creator>
          <br />
          <S.Adress>{part1}</S.Adress>
          <br />
          <S.Adress>{part2}</S.Adress>
        </h5>
      </S.Contract>
    </>
  );
}
