import invaderWallets from "../src/services/invaderWallets.js";
import { fetchazukis } from "../src/utils/data/getAzukis.js";
import { fetchlegends } from "../src/utils/data/getLegends.js";
import { safeToFile } from "../src/utils/safeToFile.js";

const getData = async () => {
  console.log("scheduler started");
  await fetchazukis();
  await fetchlegends();
  const owners = await invaderWallets();
  console.log(owners);
  safeToFile(owners);
};

getData();
