import claimStatus from "../helper/legendClaimStatus.js";

export const checkLegends = async (req, res) => {
  try {
    res.status(200).json(await claimStatus(`${req.params.id}`));
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.errors });
  }
};
