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

const balanceOfAzukis = async (wallet) => {
  try {
    return await azukiContract(web3).methods.balanceOf(wallet).call();
  } catch (error) {
    return { error: error.message, from: "balanceOfAzukis" };
  }
};

const tokenOfOwnerbyIndex = async (wallet, balance) => {
  const walletBalance = [];
  try {
    for (let i = 0; i < balance; i++) {
      const token = await azukiContract(web3)
        .methods.tokenOfOwnerByIndex(wallet, i)
        .call();
      walletBalance.push(token);
    }
    return walletBalance;
  } catch (error) {
    return { error: error.message, from: "tokenOfOwnerbyIndex" };
  }
};

export const walletCheck = async (wallet) => {
  const bl = await balanceOfAzukis(wallet);
  const aasc = await tokenOfOwnerbyIndex(wallet, bl);
  const ll = await legendsInWallet(wallet);

  return { legends: ll, azukis: aasc };
};
