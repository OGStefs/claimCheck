import Azuki from "../models/Azuki.js";
import Invader from "../models/Invader.js";
import Legend from "../models/Legend.js";

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

export const getInvadersSnapshot = async (req, res) => {
  try {
    const snapshot = await Invader.findOne().sort("-_id");
    res.status(200).json(snapshot);
  } catch (error) {
    res.status(500).json({ message: error.errors });
  }
};