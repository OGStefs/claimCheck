import forgeContract from "../../blockchain/abi/forge.js";
import sisterContract from "../../blockchain/abi/sister.js";
import { web3 } from "../web3Init.js";
import { wenClaimable } from "../wenClaimable.js";

let walletAddress = "";

const tigerForgeAddress = async (item) => {
  try {
    const forger = await forgeContract(web3)
      .methods._tigerTokenForges(item)
      .call();
    return forger.toUpperCase();
  } catch (error) {
    return { error: error.message, message: "from tigerForgeAddress" };
  }
};

const tigerForgeBlock = async (item) => {
  // check if hodler is forger
  try {
    const whoForged = await tigerForgeAddress(item);
    if (
      whoForged != walletAddress &&
      whoForged != "0X0000000000000000000000000000000000000000"
    ) {
      return `somebody else still forges this item: ${whoForged}`;
    }
    // fetch forgeBlock from contract:
    const itemForgeBlock = await forgeContract(web3)
      .methods._tigerForgeBlocks(item)
      .call();

    const block = await web3.eth.getBlock(itemForgeBlock);
    // time math:
    const claimeTime = wenClaimable(block.timestamp);

    return claimeTime;
  } catch (error) {
    return { error: error.message, message: "tigerForgeBlock" };
  }
};

const isTigerClaimed = async (item) => {
  // check if item is claimed:
  try {
    const status = sisterContract(web3).methods.tigerClaimed(item).call();
    return status;
  } catch (error) {
    return { error: error.message, message: "from isTigerClaimed" };
  }
};

export const checkTigers = async (tigersInWallet, wallet) => {
  walletAddress = wallet;
  const items = {};
  // no tigers? return empty
  if (!tigersInWallet || tigersInWallet.length < 1) {
    return { count: 0, status: "empty" };
  }

  try {
    // iterate over wallet:
    for (let i = 0; i < tigersInWallet.length; i++) {
      // check claimstatus:
      const claimed = await isTigerClaimed(tigersInWallet[i]);
      if (claimed) {
        items[tigersInWallet[i]] = "claimed";
      } else {
        // if unclaimed, fetch timestamp and return date
        const block = await tigerForgeBlock(tigersInWallet[i]);
        items[tigersInWallet[i]] = block;
      }
    }
    return { count: tigersInWallet.length, status: "ok", items };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};
