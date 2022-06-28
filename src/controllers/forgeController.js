import invaderWallets from "../services/invaderWallets.js";
import claimStatus from "../services/partnerClaimStatus.js";

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
  try {
    const owners = await invaderWallets();
    res.status(200).json({ wallets: owners });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.errors });
  }
};
