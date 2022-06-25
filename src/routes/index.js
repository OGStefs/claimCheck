import express from "express";
const router = express.Router();

import { checkLegends } from "../controllers/forgeController.js";

router.get("/", (req, res) => {
  res.send("Server is running");
});

// SCRIPT
router.get("/:id", checkLegends);
// router.get("/scripts/:id", getScript);

// router.post("/scripts", createScript);
// router.patch("/script/:id", updateScript);
// router.delete("/script/:id", deleteScript);
// router.patch("/script/:id/likeScript", likeScript);

export default router;
