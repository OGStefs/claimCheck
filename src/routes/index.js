import express from "express";
import {
  getAzukiSnapshot,
  getLegendsSnapshot,
} from "../controllers/azukiController.js";
const router = express.Router();

import {
  checkLegends,
  getAzukis,
  getLegends,
  invaderOwners,
} from "../controllers/forgeController.js";

router.get("/", (req, res) => {
  res.status(200).send("server running");
});

router.get("/api/v1/forge/:id", checkLegends);

router.get("/api/v1/invaders", invaderOwners);
router.get("/api/v1/legends", getLegendsSnapshot);
router.get("/api/v1/azukis", getAzukiSnapshot);

// router.get("/api/v1/test", getAzukiSnapshot);

export default router;
