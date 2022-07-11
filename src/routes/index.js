import express from "express";
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
router.get("/api/v1/legends", getLegends);
router.get("/api/v1/azukis", getAzukis);

export default router;
