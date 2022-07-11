import { web3 } from "../utils/web3Init.js";
import azukiContract from "../blockchain/abi/azukiAbi.js";
import tigerContract from "../blockchain/abi/tigerAbi.js";
import legendsContract from "../blockchain/abi/legendsAbi.js";
import fundaesContract from "../blockchain/abi/fundaesAbi.js";

// check for legends in wallet
const legendsInWallet = async (wallet) => {
  try {
    const legends = await legendsContract(web3)
      .methods.getWalletOfOwner(wallet)
      .call();
    console.log(legends);
    return legends;
  } catch (error) {
    return { error: error.message, from: "LegendsWalletCheck" };
  }
};

const tokenOfOwnerbyIndex = async (wallet, collection, balance) => {
  const walletBalance = [];
  try {
    for (let i = 0; i < balance; i++) {
      let token;
      if (collection === "azukis") {
        token = await azukiContract(web3)
          .methods.tokenOfOwnerByIndex(wallet, i)
          .call();
      } else if (collection === "tigers") {
        token = await tigerContract(web3)
          .methods.tokenOfOwnerByIndex(wallet, i)
          .call();
      } else if (collection === "fundaes") {
        token = await fundaesContract(web3)
          .methods.tokenOfOwnerByIndex(wallet, i)
          .call();
      }
      walletBalance.push(token);
    }
    return walletBalance;
  } catch (error) {
    return { error: error.message, from: "tokenOfOwnerbyIndex" };
  }
};

const balanceOf = async (wallet, collection) => {
  let balance = [];
  try {
    if (collection === "fundaes") {
      balance = await fundaesContract(web3).methods.balanceOf(wallet).call();
    } else if (collection === "azukis") {
      balance = await azukiContract(web3).methods.balanceOf(wallet).call();
      console.log(balance);
    } else if (collection === "tigers") {
      balance = await tigerContract(web3).methods.balanceOf(wallet).call();
    }
    return balance;
  } catch (error) {
    return { error: error.message, from: "balanceOf" };
  }
};

export const walletCheck = async (wallet) => {
  web3.eth.net
    .isListening()
    .then(() => console.log("is connected"))
    .catch((e) => console.log("not connected"));
  // if (!web3Success) {
  //   return { error: "not conected" };
  // }
  const blockNumber = await web3.eth.getBlockNumber();
  console.log(blockNumber);
  // const blTigers = await balanceOfTigers(wallet);
  const tigerBalance = await balanceOf(wallet, "tigers");
  const typicalTigers = await tokenOfOwnerbyIndex(
    wallet,
    "tigers",
    tigerBalance
  );
  // const blAASC = await balanceOfAzukis(wallet);
  const azukiBalance = await balanceOf(wallet, "azukis");
  const aasc = await tokenOfOwnerbyIndex(wallet, "azukis", azukiBalance);
  const fundaesBalance = await balanceOf(wallet, "fundaes");
  const fundae = await tokenOfOwnerbyIndex(wallet, "fundaes", fundaesBalance);
  const ll = await legendsInWallet(wallet);

  return { legends: ll, azukis: aasc, tigers: typicalTigers, fundaes: fundae };
};
