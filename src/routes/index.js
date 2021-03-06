import express from "express";
import {
  getAzukiSnapshot,
  getLegendsSnapshot,
  getInvadersSnapshot,
  getTopHolders,
  getBekxArtSnapshot,
  getTigersSnapshot,
  getWzkdSnapshot,
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
router.get("/api/v1/bekxart", getBekxArtSnapshot);
router.get("/api/v1/tigers", getTigersSnapshot);
router.get("/api/v1/wzkd", getWzkdSnapshot);

router.get("/api/v1/topholders", getTopHolders);

export default router;
