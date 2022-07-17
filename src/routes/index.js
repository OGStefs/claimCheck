import express from "express";
import {
  getAzukiSnapshot,
  getLegendsSnapshot,
  getInvadersSnapshot,
} from "../controllers/partnerController.js";
const router = express.Router();

import { checkLegends, invaderOwners } from "../controllers/forgeController.js";

router.get("/", (req, res) => {
  res.status(200).send("server running");
});
// old forge routes
router.get("/api/v1/forge/:id", checkLegends);
router.get("/api/v1/owners", invaderOwners);

// partner routes
router.get("/api/v1/legends", getLegendsSnapshot);
router.get("/api/v1/azukis", getAzukiSnapshot);
router.get("/api/v1/invaders", getInvadersSnapshot);

export default router;
