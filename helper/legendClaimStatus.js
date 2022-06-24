import Web3 from "web3";
import legendsContract from "../blockchain/abi/legendsAbi.js";
import sisterContract from "../blockchain/abi/sister.js";
import forgeContract from "../blockchain/abi/forge.js";
import azukiContract from "../blockchain/abi/azukiAbi.js";
import "dotenv/config";

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETHNODE));

let claimedLegends = {};
let walletAddress = "";

const legendForgeAddress = async (legend) => {
  try {
    const forger = await forgeContract(web3)
      .methods._legendsTokenForges(legend)
      .call();
    return forger.toUpperCase();
  } catch (error) {
    return error.message;
  }
};

const azukiForgeAddress = async (legend) => {
  try {
    const forger = await forgeContract(web3)
      .methods._azukiTokenForges(legend)
      .call();
    return forger.toUpperCase();
  } catch (error) {
    return error.message;
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
      return "somebody else still forges this item";
    }
    // fetch forgeBlock from contract:
    const legendForgeBlock = await forgeContract(web3)
      .methods._legendsForgeBlocks(legend)
      .call();

    // time math:
    const block = await web3.eth.getBlock(legendForgeBlock);
    const blockTime = block.timestamp * 1000;
    const minForgePeriod = 30 * 24 * 60 * 60 * 1000;
    const claimDate = blockTime + minForgePeriod;
    if (blockTime === 0) return "not in the forge";

    // todo: remove timezone
    const wenClaimable =
      Date.now() > claimDate
        ? "claimable now"
        : `claimable ${new Date(claimDate).toLocaleString("en-US", {
            timeZone: "America/New_York",
          })}`;

    return wenClaimable;
  } catch (error) {
    return error.message;
  }
};

const azukiForgeBlock = async (legend) => {
  // check if hodler is forger
  try {
    const whoForged = await azukiForgeAddress(legend);
    if (
      whoForged != walletAddress &&
      whoForged != "0X0000000000000000000000000000000000000000"
    ) {
      return "somebody else still forges this item";
    }
    // fetch forgeBlock from contract:
    const legendForgeBlock = await forgeContract(web3)
      .methods._azukiForgeBlocks(legend)
      .call();

    // time math:
    const block = await web3.eth.getBlock(legendForgeBlock);
    const blockTime = block.timestamp * 1000;
    const minForgePeriod = 30 * 24 * 60 * 60 * 1000;
    const claimDate = blockTime + minForgePeriod;
    if (blockTime === 0) return "not in the forge";

    // todo: remove timezone
    const wenClaimable =
      Date.now() > claimDate
        ? "claimable now"
        : `claimable ${new Date(claimDate).toLocaleString("en-US", {
            timeZone: "America/New_York",
          })}`;

    return wenClaimable;
  } catch (error) {
    return error.message;
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

const isAzukiClaimed = async (legend) => {
  // check if Legend is claimed:
  try {
    const status = sisterContract(web3).methods.azukiClaimed(legend).call();
    return status;
  } catch (error) {
    return error.message;
  }
};

const checkLegends = async (legendsInWallet) => {
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

const checkAzukis = async (legendsInWallet) => {
  const items = {};
  // TODO: fix azuki out of gas error
  if (legendsInWallet?.error !== undefined) {
    return {
      status: "error",
      error: legendsInWallet,
      msg: "gas error in azuki contract needs to be fixed",
    };
  }
  // no legends? return empty
  if (!legendsInWallet || legendsInWallet.length < 1) {
    return { count: 0, status: "empty" };
  }

  try {
    // iterate over wallet:
    for (let i = 0; i < legendsInWallet.length; i++) {
      // check claimstatus:
      const claimed = await isAzukiClaimed(legendsInWallet[i]);
      if (claimed) {
        items[legendsInWallet[i]] = "claimed";
      } else {
        // if unclaimed, fetch timestamp and return date
        const block = await azukiForgeBlock(legendsInWallet[i]);
        items[legendsInWallet[i]] = block;
      }
    }
    return { count: legendsInWallet.length, status: "ok", items };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

const walletCheck = async (wallet) => {
  try {
    // check for legends in wallet
    const legendsInWallet = await legendsContract(web3)
      .methods.getWalletOfOwner(wallet)
      .call();
    // check for azukis in wallet
    let azukisInWallet;
    try {
      azukisInWallet = await azukiContract(web3).methods.owned(wallet).call();
    } catch (error) {
      azukisInWallet = { error: error.message };
    }
    return { legends: legendsInWallet, azukis: azukisInWallet };
  } catch (error) {
    console.log({ error: error.message, from: "walletCheck" });
    return { error: error.message, from: "walletCheck" };
  }
};

// TODO: check ERC-721 ABI / delete unnecessary code / possibly use only 1 ABI for all partners
// TODO: add partners
// entry point:
const claimStatus = async (wallet) => {
  claimedLegends = {};
  walletAddress = wallet.toUpperCase();
  try {
    const ownerWallet = await walletCheck(wallet);
    const legendsStatus = await checkLegends(ownerWallet.legends);
    const azukiStatus = await checkAzukis(ownerWallet.azukis);
    return { legends: legendsStatus, azukis: azukiStatus };
  } catch (error) {
    console.log({ error: error.message, from: "claimStatus" });
    return { error: error.message, from: "claimStatus" };
  }
};

export default claimStatus;
