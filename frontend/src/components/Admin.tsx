import * as S from "./Styles";
import { useStates } from "./Layout";
import { getBalance, withdraw } from "../services/contractInteractions";
import { useEffect, useState } from "react";

export default function Admin() {
  const { contract, web3, connectedAccount } = useStates();
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    if (contract) {
      const newBalance = await getBalance(contract, web3);
      setBalance(newBalance);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [contract]);

  async function handleWithdraw() {
    await withdraw(contract, connectedAccount);
    fetchBalance();
  }

  return (
    <S.Admin>
      <h2>Admin Area</h2>
      <p>
        Here you can check the balance of the contract and withdraw funds if you
        are the creator of the contract.
      </p>
      <p>
        <b>Balance:</b> {balance} ETH
      </p>
      <S.Btn onClick={handleWithdraw}>Withdraw</S.Btn>
    </S.Admin>
  );
}
