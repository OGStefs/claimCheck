import { schedule } from "node-cron";
import { safeToFile } from "../utils/safeToFile.js";
import invaderWallets from "../services/invaderWallets.js";
import { fetchazukis } from "./data/getAzukis.js";
import { fetchlegends } from "./data/getLegends.js";

schedule(" */30 * * * *", async () => {
  await fetchazukis();
  await fetchlegends();
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

// schedule(" */5 * * * *", async () => {
//   console.log("start");
//   await fetchazukis();
//   await fetchlegends();
//   console.log("end");
// });
