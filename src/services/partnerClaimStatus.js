import "dotenv/config";
import { walletCheck } from "../utils/getPartnersInWallet.js";
import { checkLegends } from "../utils/legendStatus.js";
import { checkAzukis } from "../utils/azukiStatus.js";

let walletAddress = "";
let claimedPartners = {};

// TODO: check ERC-721 ABI / delete unnecessary code / possibly use only 1 ABI for all partners
// TODO: add partners

const claimStatus = async (wallet) => {
  claimedPartners = {};
  walletAddress = wallet.toUpperCase();
  try {
    const ownerWallet = await walletCheck(wallet);
    const legendsStatus = await checkLegends(
      ownerWallet.legends,
      walletAddress
    );

    const azukiStatus = await checkAzukis(ownerWallet.azukis, walletAddress);

    return { legends: legendsStatus, azukis: azukiStatus };
  } catch (error) {
    console.log({ error: error.message, from: "claimStatus" });
    return { error: error.message, from: "claimStatus" };
  }
};

export default claimStatus;
