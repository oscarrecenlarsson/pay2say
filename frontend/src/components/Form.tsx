import * as S from "./Styles";
import { useStates } from "./Layout";
import { useState, ChangeEvent } from "react";
import { FormData } from "../interfaces/interfaces";
import { updateState } from "../services/contractInteractions";

export default function Form() {
  const { contract, connectedAccount, populateContractState, web3 } =
    useStates();
  const [formData, setFormData] = useState<FormData>({ text: "", amount: "0" });

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  //const byteSize = new Blob([formData.text]).size;
  //console.log(byteSize);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.text.trim()) {
      console.error("Text is required");
      return;
    }

    const byteSize = new Blob([formData.text]).size;
    if (byteSize > 120) {
      console.error(
        "Text must be 120 bytes or less. Current size:",
        byteSize,
        "bytes"
      );
      return;
    }

    // const minimumAmount = 0.000000000000000001;

    // if (formData.amount < minimumAmount) {
    //   console.error("Amount must be greater than", minimumAmount);
    //   return;
    // }

    await updateState(
      contract,
      connectedAccount,
      formData.text,
      formData.amount
    );
    populateContractState(contract, web3);
  }

  return (
    <>
      <S.Form onSubmit={handleSubmit}>
        <h2>Form</h2>
        <p>
          If you want to change the text in the contract you can submit a new
          text here, just make sure the amount you send in is greater than the
          amount in the contract.
        </p>

        <S.Label htmlFor="text">Write your text. Max size 120 bytes.</S.Label>

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
