import { schedule } from "node-cron";
import { safeToFile } from "../utils/safeToFile.js";
import invaderWallets from "../services/invaderWallets.js";

schedule(" */30 * * * *", async () => {
  const owners = await invaderWallets();
  const ownersWithTime = {
    time: new Date(Date.now()).toLocaleString(),
    owners,
  };
  safeToFile(ownersWithTime);
  console.log(
    "data safed to file",
    new Date().toLocaleString("en-US", { timeZone: "EST" })
  );
});
