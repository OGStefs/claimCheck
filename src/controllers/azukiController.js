import Azuki from "../models/Azuki.js";
import Legend from "../models/Legends.js";

export const saveAzukiSnapshot = async (azukis) => {
  const azuki = new Azuki({
    snapshot: {
      entries: azukis.ownerArray,
    },
    duration: azukis.duration,
  });
  await azuki.save();
  console.log("azuki Snaphot saved");
};

export const saveLegendSnapshot = async (legends) => {
  const legend = new Legend({
    snapshot: {
      entries: legends.ownerArray,
    },
    duration: legends.duration,
  });
  await legend.save();
  console.log("legend snapshot saved");
};

export const getAzukiSnapshot = async (req, res) => {
  try {
    const snapshot = await Azuki.findOne().sort("-_id");
    res.status(200).json(snapshot);
  } catch (error) {
    res.status(500).json({ message: error.errors });
  }
};

export const getLegendsSnapshot = async (req, res) => {
  try {
    const snapshot = await Legend.findOne().sort("-_id");
    res.status(200).json(snapshot);
  } catch (error) {
    res.status(500).json({ message: error.errors });
  }
};
