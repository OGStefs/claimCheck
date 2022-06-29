import { web3 } from "../utils/web3Init.js";
import azukiContract from "../blockchain/abi/azukiAbi.js";
import tigerContract from "../blockchain/abi/tigerAbi.js";
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

const balanceOfTigers = async (wallet) => {
  try {
    const balance = await tigerContract(web3).methods.balanceOf(wallet).call();
    return balance;
  } catch (error) {
    return { error: error.message, from: "balanceOfTigers" };
  }
};

const tokenOfOwnerbyIndexTiger = async (wallet, balance) => {
  const walletBalance = [];
  try {
    for (let i = 0; i < balance; i++) {
      const token = await tigerContract(web3)
        .methods.tokenOfOwnerByIndex(wallet, i)
        .call();
      walletBalance.push(token);
    }
    return walletBalance;
  } catch (error) {
    return { error: error.message, from: "tokenOfOwnerbyIndexTiger" };
  }
};

export const walletCheck = async (wallet) => {
  const blTigers = await balanceOfTigers(wallet);
  const typicalTigers = await tokenOfOwnerbyIndexTiger(wallet, blTigers);
  const blAASC = await balanceOfAzukis(wallet);
  const aasc = await tokenOfOwnerbyIndex(wallet, blAASC);
  const ll = await legendsInWallet(wallet);

  return { legends: ll, azukis: aasc, tigers: typicalTigers };
};
