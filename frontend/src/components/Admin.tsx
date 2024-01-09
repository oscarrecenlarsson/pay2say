import { useCallback, useEffect, useState } from "react";
import * as S from "./Styles";
import { useStates } from "./Layout";
import { getBalance, withdraw } from "../services/contractInteractions";

export default function Admin() {
  const { contract, web3, connectedAccount } = useStates();
  const [balance, setBalance] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchBalance = useCallback(async () => {
    if (contract) {
      const newBalance = await getBalance(contract, web3);
      setBalance(newBalance);
    }
  }, [contract, web3]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  async function handleWithdraw() {
    setErrorMessage("");
    try {
      setTransactionStatus("Processing withdrawal...");
      await withdraw(contract, connectedAccount);
      fetchBalance();
      setTransactionStatus("Withdrawal successful!");
      setTimeout(() => {
        setTransactionStatus("");
      }, 3000);
    } catch (error: any) {
      if (error.message.includes("User denied transaction signature")) {
        setTransactionStatus("");
        setErrorMessage("Transaction rejected");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else {
        setErrorMessage("An error occurred while updating the contract.");
      }
    }
  }

  return (
    <S.Admin>
      <h2>Admin Area</h2>
      <p>
        Here you can check the balance of the contract and withdraw funds if you
        are the creator of the contract.
      </p>
      {errorMessage && <S.FormError>{errorMessage}</S.FormError>}{" "}
      {transactionStatus && (
        <S.SubmitStatus>{transactionStatus}</S.SubmitStatus>
      )}
      <p>
        <b>Balance:</b> {balance} ETH.
      </p>
      <S.Btn onClick={handleWithdraw}>Withdraw</S.Btn>
    </S.Admin>
  );
}
