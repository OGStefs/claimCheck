import "dotenv/config";
import { ownerWallets } from "../utils/ownerOfInvaders.js";

const invaderWallets = async () => {
  try {
    const wallets = await ownerWallets();
    return wallets;
  } catch (error) {
    console.log({ error: error.message, from: "invaderWallets" });
    return { error: error.message, from: "invaderWallets" };
  }
};

export default invaderWallets;
