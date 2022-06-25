import forgeContract from "../blockchain/abi/forge.js";
import sisterContract from "../blockchain/abi/sister.js";
import { web3 } from "../utils/web3Init.js";
import { wenClaimable } from "./wenClaimable.js";

let walletAddress = "";

const azukiForgeAddress = async (item) => {
  try {
    const forger = await forgeContract(web3)
      .methods._azukiTokenForges(item)
      .call();
    return forger.toUpperCase();
  } catch (error) {
    return { error: error.message, message: "from azukiForgeAddress" };
  }
};

const azukiForgeBlock = async (item) => {
  // check if hodler is forger
  try {
    const whoForged = await azukiForgeAddress(item);
    if (
      whoForged != walletAddress &&
      whoForged != "0X0000000000000000000000000000000000000000"
    ) {
      return `somebody else still forges this item ${whoForged}`;
    }
    // fetch forgeBlock from contract:
    const itemForgeBlock = await forgeContract(web3)
      .methods._azukiForgeBlocks(item)
      .call();

    const block = await web3.eth.getBlock(itemForgeBlock);
    // time math:
    const claimeTime = wenClaimable(block.timestamp);

    return claimeTime;
  } catch (error) {
    return { error: error.message, message: "azukiForgeBlock" };
  }
};

const isAzukiClaimed = async (item) => {
  // check if item is claimed:
  try {
    const status = sisterContract(web3).methods.azukiClaimed(item).call();
    return status;
  } catch (error) {
    return { error: error.message, message: "from isAzukiClaimed" };
  }
};

export const checkAzukis = async (itemsInWallet, wallet) => {
  walletAddress = wallet;
  const items = {};
  // TODO: fix azuki out of gas error
  if (itemsInWallet?.error !== undefined) {
    return {
      status: "error",
      error: itemsInWallet,
      msg: "gas error in azuki contract needs to be fixed",
    };
  }
  // no itemsInWallet? return empty
  if (!itemsInWallet || itemsInWallet.length < 1) {
    return { count: 0, status: "empty" };
  }

  try {
    // iterate over wallet:
    for (let i = 0; i < itemsInWallet.length; i++) {
      // check claimstatus:
      const claimed = await isAzukiClaimed(itemsInWallet[i]);
      if (claimed) {
        items[itemsInWallet[i]] = "claimed";
      } else {
        // if unclaimed, fetch timestamp and return date
        const block = await azukiForgeBlock(itemsInWallet[i]);
        items[itemsInWallet[i]] = block;
      }
    }
    return { count: itemsInWallet.length, status: "ok", items };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};
