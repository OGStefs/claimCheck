import { web3 } from "../utils/web3Init.js";
import azukiContract from "../blockchain/abi/azukiAbi.js";
import legendsContract from "../blockchain/abi/legendsAbi.js";

// check for legends in wallet
const legendsInWallet = async (wallet) => {
  try {
    return await legendsContract(web3).methods.getWalletOfOwner(wallet).call();
  } catch (error) {
    return { error: error.message, from: "LegendsWalletCheck" };
  }
};

const azukisInWallet = async (wallet) => {
  try {
    return await azukiContract(web3).methods.owned(wallet).call();
  } catch (error) {
    return { error: error.message, from: "AzukisWalletCheck" };
  }
};

export const walletCheck = async (wallet) => {
  const ll = await legendsInWallet(wallet);
  const aasc = await azukisInWallet(wallet);

  return { legends: ll, azukis: aasc };
};
