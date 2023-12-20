import * as S from "./Styles";
import { useStates } from "./Layout";
import { useState, ChangeEvent } from "react";
import { FormData } from "../interfaces/interfaces";
import { updateState } from "../services/contractInteractions";

export default function Form() {
  const { contract, connectedAccount, populateContractState } = useStates();
  const [formData, setFormData] = useState<FormData>({ text: "", amount: 0 });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // ??? NOT OPENING METAMASK FOR SIGNING
    //console.log("opening up metaMask...");

    const minimumAmount = 0.000000000000000001;

    if (formData.amount < minimumAmount) {
      console.error("Amount must be greater than", minimumAmount);
      return;
    }

    await updateState(
      contract,
      connectedAccount,
      formData.text,
      formData.amount
    );
    populateContractState(contract);
  }

  return (
    <>
      <S.Form onSubmit={handleSubmit}>
        <h2>Form</h2>
        <label htmlFor="text">Text</label>
        <input
          type="text"
          id="text"
          name="text"
          onChange={handleChange}
          value={formData.text}
        />

        <label htmlFor="amount">Amount in ETH</label>
        <input
          type="number"
          id="amount"
          name="amount"
          onChange={handleChange}
          value={formData.amount}
        />
        <button type="submit">Submit</button>
      </S.Form>
    </>
  );
}
