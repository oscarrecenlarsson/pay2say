import * as S from "./Styles";
import { useStates } from "./Layout";
import { useState, ChangeEvent } from "react";
import { FormData } from "../interfaces/interfaces";
import { updateState } from "../services/contractInteractions";
import BigNumber from "bignumber.js";
import * as utils from "web3-utils";

export default function Form() {
  const {
    contract,
    contractState,
    connectedAccount,
    populateContractState,
    web3,
  } = useStates();
  const [formData, setFormData] = useState<FormData>({ text: "", amount: "0" });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [transactionStatus, setTransactionStatus] = useState<string>("");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.text.trim()) {
      setErrorMessage("Text is required.");
      return;
    }

    const byteSize = new Blob([formData.text]).size;
    if (byteSize > 140) {
      setErrorMessage(
        `Text must be 140 bytes or less. Current size: ${byteSize} bytes.`
      );
      return;
    }

    const formAmount = new BigNumber(utils.toWei(formData.amount, "ether"));
    const contractAmount = new BigNumber(
      utils.toWei(contractState.amount, "ether")
    );

    if (
      !formAmount ||
      formAmount.isNaN() ||
      formAmount.isLessThanOrEqualTo(0)
    ) {
      setErrorMessage("Please enter a valid amount greater than zero.");
      return;
    }

    if (formAmount.isLessThanOrEqualTo(contractAmount)) {
      setErrorMessage(
        "Amount must be greater than the current amount in the contract."
      );
      return;
    }

    setErrorMessage("");
    setTransactionStatus("Transaction pending...");

    try {
      await updateState(
        contract,
        connectedAccount,
        formData.text,
        formData.amount
      );
      populateContractState(contract, web3);
      setFormData({ text: "", amount: "0" });
      setTransactionStatus("Transaction completed successfully!");
      setTimeout(() => {
        setTransactionStatus("");
      }, 3000);
    } catch (error: any) {
      console.error(error);
      if (error.message.includes("No connected account found")) {
        setErrorMessage("Please connect your wallet to submit. (Sepolia)");
        setTransactionStatus("");
      } else if (error.message.includes("User denied transaction signature")) {
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
    <>
      <S.Form onSubmit={handleSubmit}>
        <h2>Form</h2>
        <p>
          If you want to change the text in the contract you can submit a new
          text here, just make sure the amount you send is greater than the
          amount in the contract. Hint: you can click on the amount in the
          contract to copy it!
        </p>
        {errorMessage && <S.FormError>{errorMessage}</S.FormError>}{" "}
        {transactionStatus && (
          <S.SubmitStatus>{transactionStatus}</S.SubmitStatus>
        )}
        <S.Label htmlFor="text">Write your text. Max size 140 bytes.</S.Label>
        <textarea
          id="text"
          name="text"
          rows={4}
          cols={43}
          value={formData.text}
          onChange={handleChange}
        ></textarea>
        <S.Label htmlFor="amount">Specify your amount in ETH</S.Label>
        <input
          type="number"
          id="amount"
          name="amount"
          onChange={handleChange}
          value={formData.amount}
        />
        <S.Btn type="submit">Submit</S.Btn>
      </S.Form>
    </>
  );
}
