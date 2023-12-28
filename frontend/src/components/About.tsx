import * as S from "./Styles";

export default function About() {
  return (
    <>
      <S.Text>
        <h2>About Pay2Say</h2>
        Welcome to Pay2Say, where the classic concept of free speech meets the
        world of Web3 technology. The site displays the contents of a smart
        contract where users have the opportunity to express themselves through
        a 120-byte text, reminiscent of the original tweet length. The catch? To
        set your text, you must outbid the previous contributor by sending more
        Ethereum (ETH). This creates a dynamic stream of thoughts and opinions,
        showcasing the value people place on having their voice heard. Whether
        it's a statement, a quote, or an advertisement, this platform serves as
        a decentralized stage for expression, challenging users to consider how
        much they are willing to pay to share their message or change the
        existing narrative. On the homepage we also provide a form to interact
        with the contract.
      </S.Text>
      <S.Image>
        <img
          src="/assets/pay2sayLogo.png"
          alt="Pay2Say Logo"
          width="400"
          height="400"
        ></img>
      </S.Image>
    </>
  );
}
