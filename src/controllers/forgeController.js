import invaderWallets from "../services/invaderWallets.js";
import claimStatus from "../services/partnerClaimStatus.js";
import { readFile } from "fs/promises";

const getData = async () => {
  let json = {};

  try {
    json = JSON.parse(
      await readFile(new URL("../storage/wallets.json", import.meta.url))
    );
  } catch (error) {
    console.log(error.message);
    json = { error: error.message };
  }

  console.log(json);
  return json;
};

export const checkLegends = async (req, res) => {
  // console.log(req.params.id);
  try {
    // res.status(200).json(await claimStatus(`${req.query.address}`));
    res.status(200).json(await claimStatus(`${req.params.id}`));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.errors });
  }
};

export const invaderOwners = async (req, res) => {
  const data = await getData();
  try {
    // const owners = await invaderWallets();
    // res.status(200).json({ wallets: owners});
    res.status(200).json({ wallets: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.errors });
  }
};
