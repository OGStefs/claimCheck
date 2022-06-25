import claimStatus from "../services/partnerClaimStatus.js";

export const checkLegends = async (req, res) => {
  // console.log(req.query.address);
  try {
    // res.status(200).json(await claimStatus(`${req.query.address}`));
    res.status(200).json(await claimStatus(`${req.params.id}`));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.errors });
  }
};
