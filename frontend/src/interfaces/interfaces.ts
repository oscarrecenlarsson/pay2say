export interface ContractState {
  text: string;
  amount: string;
  creator: string;
}

export interface FormData {
  text: string;
  amount: string;
}

// export interface Pay2SayContract {
//   text(): Promise<string>;
//   amount(): Promise<number>;
//   creator(): Promise<string>;
//   updateState(_text: string): Promise<void>;
//   withdraw(): Promise<void>;
// }
