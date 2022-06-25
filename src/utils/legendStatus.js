import forgeContract from "../blockchain/abi/forge.js";
import sisterContract from "../blockchain/abi/sister.js";
import { web3 } from "../utils/web3Init.js";
import { wenClaimable } from "./wenClaimable.js";

let walletAddress = "";

const legendForgeAddress = async (legend) => {
  try {
    const forger = await forgeContract(web3)
      .methods._legendsTokenForges(legend)
      .call();
    return forger.toUpperCase();
  } catch (error) {
    return { error: error.message, message: "from legendForgeAddress" };
  }
};

const legendForgeBlock = async (legend) => {
  // check if hodler is forger
  try {
    const whoForged = await legendForgeAddress(legend);
    if (
      whoForged != walletAddress &&
      whoForged != "0X0000000000000000000000000000000000000000"
    ) {
      return `somebody else still forges this item: ${whoForged}`;
    }
    // fetch forgeBlock from contract:
    const legendForgeBlock = await forgeContract(web3)
      .methods._legendsForgeBlocks(legend)
      .call();

    const block = await web3.eth.getBlock(legendForgeBlock);
    // time math:
    const claimeTime = wenClaimable(block.timestamp);

    return claimeTime;
  } catch (error) {
    return { error: error.message, message: "legendForgeBlock" };
  }
};

const isLegendClaimed = async (legend) => {
  // check if Legend is claimed:
  try {
    const status = sisterContract(web3).methods.legendsClaimed(legend).call();
    return status;
  } catch (error) {
    return error.message;
  }
};

export const checkLegends = async (legendsInWallet, wallet) => {
  walletAddress = wallet;
  const items = {};
  // no legends? return empty
  if (!legendsInWallet || legendsInWallet.length < 1) {
    return { count: 0, status: "empty" };
  }

  try {
    // iterate over wallet:
    for (let i = 0; i < legendsInWallet.length; i++) {
      // check claimstatus:
      const claimed = await isLegendClaimed(legendsInWallet[i]);
      if (claimed) {
        items[legendsInWallet[i]] = "claimed";
      } else {
        // if unclaimed, fetch timestamp and return date
        const block = await legendForgeBlock(legendsInWallet[i]);
        items[legendsInWallet[i]] = block;
      }
    }
    return { count: legendsInWallet.length, status: "ok", items };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};
