import express from "express";
import cors from "cors";

import legends from "./legendClaimStatus.js";

// import routes from "../server/routes/index.js";

const app = express();

app.use(cors());

// app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

const checkLegends = async (req, res) => {
  res.status(200).json(await legends(`${req.params.id}`));
};

app.get("/:id", checkLegends);

export default app;
