import { ethers } from "ethers";

// const provider = new ethers.providers.WebSocketProvider(
//   process.env.WS_ETHNODE || "ws://192.168.178.57:8546/"
// );

const provider =
  process.env.NODE_ENV === "production"
    ? new ethers.providers.JsonRpcProvider(process.env.ETHNODE)
    : new ethers.providers.WebSocketProvider(process.env.WS_ETHNODE);

// const provider = new ethers.providers.JsonRpcProvider(
//   "http://52.87.46.216:8545/"
// );

export const getEns = async (address) => {
  try {
    const addy = await provider.lookupAddress(address.toLowerCase());
    return addy;
  } catch (error) {
    console.log("Error from getENS: ", error.message);
    return null;
  }
};
