import forgeContract from "../../blockchain/abi/forge.js";
import sisterContract from "../../blockchain/abi/sister.js";
import { web3 } from "../web3Init.js";
import { wenClaimable } from "../wenClaimable.js";

let walletAddress = "";

const fundaeForgeAddress = async (item) => {
  try {
    const forger = await forgeContract(web3)
      .methods._fundaeTokenForges(item)
      .call();
    return forger.toUpperCase();
  } catch (error) {
    return { error: error.message, message: "from fundaeForgeAddress" };
  }
};

const fundaeForgeBlock = async (item) => {
  // check if hodler is forger
  try {
    const whoForged = await fundaeForgeAddress(item);
    if (
      whoForged != walletAddress &&
      whoForged != "0X0000000000000000000000000000000000000000"
    ) {
      return `somebody else still forges this item: ${whoForged}`;
    }
    // fetch forgeBlock from contract:
    const itemForgeBlock = await forgeContract(web3)
      .methods._fundaeForgeBlocks(item)
      .call();

    const block = await web3.eth.getBlock(itemForgeBlock);
    // time math:
    const claimeTime = wenClaimable(block.timestamp);

    return claimeTime;
  } catch (error) {
    return { error: error.message, message: "fundaeForgeBlock" };
  }
};

const isFundaeClaimed = async (item) => {
  // check if item is claimed:
  try {
    const status = sisterContract(web3).methods.fundaeClaimed(item).call();
    return status;
  } catch (error) {
    return { error: error.message, message: "from isFundaeClaimed" };
  }
};

export const checkFundaes = async (fundaesInWallet, wallet) => {
  walletAddress = wallet;
  const items = {};
  // no fundaes? return empty
  if (!fundaesInWallet || fundaesInWallet.length < 1) {
    return { count: 0, status: "empty" };
  }

  try {
    // iterate over wallet:
    for (let i = 0; i < fundaesInWallet.length; i++) {
      // check claimstatus:
      const claimed = await isFundaeClaimed(fundaesInWallet[i]);
      if (claimed) {
        items[fundaesInWallet[i]] = "claimed";
      } else {
        // if unclaimed, fetch timestamp and return date
        const block = await fundaeForgeBlock(fundaesInWallet[i]);
        items[fundaesInWallet[i]] = block;
      }
    }
    return { count: fundaesInWallet.length, status: "ok", items };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};
