import Web3 from "web3";

export const web3 =
  process.env.NODE_ENV === "production"
    ? new Web3(new Web3.providers.HttpProvider(process.env.ETHNODE))
    : new Web3(new Web3.providers.WebsocketProvider(process.env.WS_ETHNODE));

//TODO: check blocktime against provider -> if difference too big, change provider

// console.log("web3init", process.env.ETHNODE);

// export const web3 = new Web3(
//   new Web3.providers.HttpProvider(process.env.ETHNODE)
// );

const blockNumber = await web3.eth.getBlockNumber();
console.log(blockNumber);
