import express from "express";
import http from "http";
const router = express.Router();

import { checkLegends, invaderOwners } from "../controllers/forgeController.js";

// const testHTML = `
// <div style="width:400px; margin:0 auto">
// <form style="width:400px; margin:0 auto" action="/api/v1/address/">
//   <label for="address">Enter ETH address:</label><br>
//   <input style="width:400px; margin:5 auto" type="text" id="address" name="address"><br>
//   <input style="width:100px; margin:10 auto" type="submit" value="Submit">
// </form>
// </div>`;

router.get("/", (req, res) => {
  res.status(200).send("server running");
});

// SCRIPT
router.get("/api/v1/forge/:id", checkLegends);

router.get("/api/v1/invaders", invaderOwners);
// router.get("/scripts/:id", getScript);

// router.post("/scripts", createScript);
// router.patch("/script/:id", updateScript);
// router.delete("/script/:id", deleteScript);
// router.patch("/script/:id/likeScript", likeScript);

export default router;
