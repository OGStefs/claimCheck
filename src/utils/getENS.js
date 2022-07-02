import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "http://192.168.178.57:8545/"
);

export const getEns = async (address) => {
  try {
    const addy = await provider.lookupAddress(address.toLowerCase());
    return addy;
  } catch (error) {
    console.log("Error from getENS: ", error.message);
    return null;
  }
};
