import invaderWallets from "../src/services/invaderWallets.js";
import { safeToFile } from "../src/utils/safeToFile.js";

const getData = async () => {
  console.log("scheduler started");
  const owners = await invaderWallets();
  console.log(owners);
  safeToFile(owners);
};

getData();
