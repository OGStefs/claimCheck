import invaderWallets from "../services/invaderWallets.js";
import claimStatus from "../services/partnerClaimStatus.js";
import { readFile } from "fs/promises";

const getData = async (partner = "wallets") => {
  let json = {};

  try {
    json = JSON.parse(
      await readFile(new URL(`../storage/${partner}.json`, import.meta.url))
    );
  } catch (error) {
    console.log(error.message);
    json = { error: error.message };
  }
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

export const getAzukis = async (req, res) => {
  try {
    const data = await getData("azukis");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.errors });
  }
};

export const getLegends = async (req, res) => {
  try {
    const data = await getData("legends");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.errors });
  }
};
