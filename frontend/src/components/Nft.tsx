import * as S from "./Styles";

export default function Nft() {
  return (
    <>
      <S.Text>
        <h2>NFT</h2>Soon we will launch the ability to mint an NFT based on the
        current state of the Pay2Say contract. The idea is to only provide the
        metadata as a proof of the current state of the contract.
      </S.Text>
      <S.Image>
        <img
          src={`${process.env.REACT_APP_IMG_PATH}/nfts.png`}
          alt="NFTs"
          width="400"
          height="400"
        ></img>
      </S.Image>
    </>
  );
}
