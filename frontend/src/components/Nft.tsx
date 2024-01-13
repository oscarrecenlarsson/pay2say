import * as S from "./Styles";

export default function Nft() {
  return (
    <>
      <S.Text>
        <h2>NFT</h2>
        <p>
          Whenever you set a new state to the contract you will be rewarded with
          a dynamically generated text based NFT with your text as an SVG and
          the amount you paid as a property of the NFT. Check out the collection
          to see what other people have written and get inspired to create you
          own NFT today!
        </p>
        <br />
        <S.Btn>
          <a
            href="https://testnets.opensea.io/collection/pay2say-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on OpenSea
          </a>
        </S.Btn>
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
