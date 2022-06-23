import Web3 from "web3";
import legendsContract from "./blockchain/abi/legendsAbi.js";
import sisterContract from "./blockchain/abi/sister.js";
import forgeContract from "./blockchain/abi/forge.js";
import "dotenv/config";

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETHNODE));

let claimedLegends = {};
let walletAddress = "";

const forgeAddress = async (legend) => {
  try {
    const forger = await forgeContract(web3)
      .methods._legendsTokenForges(legend)
      .call();
    return forger.toUpperCase();
  } catch (error) {
    return error.message;
  }
};

const forgedBlock = async (legend) => {
  // check if hodler is forger
  try {
    const whoForged = await forgeAddress(legend);
    if (
      whoForged != walletAddress &&
      whoForged != "0X0000000000000000000000000000000000000000"
    ) {
      return "somebody else still forges this item";
    }
    // fetch forgeBlock from contract:
    const forgedBlock = await forgeContract(web3)
      .methods._legendsForgeBlocks(legend)
      .call();

    // time math:
    const block = await web3.eth.getBlock(forgedBlock);
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

const isClaimed = async (legend) => {
  // check if Legend is claimed:
  try {
    const status = sisterContract(web3).methods.legendsClaimed(legend).call();
    return status;
  } catch (error) {
    return error.message;
  }
};

const claimStatus = async (legendsInWallet) => {
  // check if legends are in wallet:
  if (legendsInWallet.length > 0) {
    try {
      // iterate over wallet:
      for (let i = 0; i < legendsInWallet.length; i++) {
        // check claimstatus:
        const claimed = await isClaimed(legendsInWallet[i]);
        if (claimed) {
          claimedLegends[legendsInWallet[i]] = "claimed";
        } else {
          // if unclaimed, fetch timestamp and return date
          const block = await forgedBlock(legendsInWallet[i]);
          claimedLegends[legendsInWallet[i]] = block;
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log("no legends in the wallet");
  }
};

// entry point:
const legends = async (wallet) => {
  claimedLegends = {};
  walletAddress = wallet.toUpperCase();
  try {
    // check for legends in wallet
    const legendsInWallet = await legendsContract(web3)
      .methods.getWalletOfOwner(wallet)
      .call();
    // ckeck claim status
    console.log(legendsInWallet);
    await claimStatus(legendsInWallet);
    return claimedLegends;
  } catch (error) {
    console.log(error.message);
    return "an error occurred";
  }
};

export default legends;
