import { schedule } from "node-cron";
import { safeToFile } from "../utils/safeToFile.js";
import invaderWallets from "../services/invaderWallets.js";
// import { fetchAzukis } from "./data/getAzukis.js";
// import { fetchLegends } from "./data/getLegends.js";
// import { fetchInvaders } from "./data/getInvaders.js";
import { getPartners } from "../services/getPartners.js";

// export const fetchInvaders = async () => {
//   console.log("fetching starts");
//   await getPartners("azukis");
//   await getPartners("legends");
//   await getPartners("invaders");
// };

schedule(" */29 * * * *", async () => {
  console.log("fetching starts");
  await getPartners("azukis");
  await getPartners("legends");
  await getPartners("invaders");

  const owners = await invaderWallets();
  const ownersWithTime = {
    time_EST: new Date(Date.now()).toLocaleString("en-US", { timeZone: "EST" }),
    owners,
  };
  safeToFile(ownersWithTime);
  console.log(
    "data safed to file",
    new Date().toLocaleString("en-US", { timeZone: "EST" })
  );
});
