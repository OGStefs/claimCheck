import Web3 from "web3";

export const web3 =
  process.env.NODE_ENV === "production"
    ? new Web3(new Web3.providers.HttpProvider(process.env.ETHNODE))
    : new Web3(new Web3.providers.WebsocketProvider(process.env.WS_ETHNODE));

//TODO: check blocktime against provider -> if difference too big, change provider

// const web3Test = new Web3(
//   new Web3.providers.HttpProvider(process.env.ETHNODE)
// );
