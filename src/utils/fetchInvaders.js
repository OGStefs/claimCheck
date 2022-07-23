import { schedule } from "node-cron";

// import { safeToFile } from "../utils/safeToFile.js";
// import invaderWallets from "../services/invaderWallets.js";

import { getPartners } from "../services/getPartners.js";

// const fetchBekx = async () => {
//   console.log("fetching starts");
//   await getPartners("wzkd");
// };

// fetchBekx();

schedule(" */29 * * * *", async () => {
  console.log("fetching starts");
  await getPartners("azukis");
  await getPartners("legends");
  await getPartners("invaders");
  await getPartners("bekxArt");
  await getPartners("tigers");
  await getPartners("wzkd");

  // const owners = await invaderWallets();
  // const ownersWithTime = {
  //   time_EST: new Date(Date.now()).toLocaleString("en-US", { timeZone: "EST" }),
  //   owners,
  // };
  // safeToFile(ownersWithTime);
  // console.log(
  //   "data safed to file",
  //   new Date().toLocaleString("en-US", { timeZone: "EST" })
  // );
});
