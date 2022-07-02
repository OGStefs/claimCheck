import "dotenv/config";
import { walletCheck } from "../utils/getPartnersInWallet.js";
import { checkLegends } from "../utils/claimStatus/legendStatus.js";
import { checkAzukis } from "../utils/claimStatus/azukiStatus.js";
import { checkTigers } from "../utils/claimStatus/tigerStatus.js";
import { checkFundaes } from "../utils/claimStatus/fundaeStatus.js";
import { getEns } from "../utils/getENS.js";

let walletAddress = "";
let claimedPartners = {};

// TODO: check ERC-721 ABI / delete unnecessary code / possibly use only 1 ABI for all partners
// TODO: add partners

const claimStatus = async (wallet) => {
  const start = Date.now();
  claimedPartners = {};
  walletAddress = wallet.toUpperCase();
  try {
    const ownerWallet = await walletCheck(wallet);
    const legendsStatus = await checkLegends(
      ownerWallet.legends,
      walletAddress
    );

    const azukiStatus = await checkAzukis(ownerWallet.azukis, walletAddress);

    const tigerStatus = await checkTigers(ownerWallet.tigers, walletAddress);

    const fundaeStatus = await checkFundaes(ownerWallet.fundaes, walletAddress);

    const ensResolver = await getEns(walletAddress);
    console.log((Date.now() - start) / 1000);
    return {
      ens: ensResolver,
      legends: legendsStatus,
      azukis: azukiStatus,
      tigers: tigerStatus,
      fundaes: fundaeStatus,
    };
  } catch (error) {
    console.log({ error: error.message, from: "claimStatus" });
    return { error: error.message, from: "claimStatus" };
  }
};

export default claimStatus;
