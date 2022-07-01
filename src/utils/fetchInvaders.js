import { schedule } from "node-cron";
import { safeToFile } from "../utils/safeToFile.js";
import invaderWallets from "../services/invaderWallets.js";

schedule(" */30 * * * *", async () => {
  const owners = await invaderWallets();
  console.log(owners);
  safeToFile(owners);
  console.log("running a task every 10 minutes");
});
