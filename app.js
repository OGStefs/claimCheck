import express from "express";
import cors from "cors";

import legends from "./legendClaimStatus.js";

// import routes from "../server/routes/index.js";

// create our Express app
const app = express();

app.use(cors());

// app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const getScript = async (req, res) => {
  console.log(req.params.id);
  res.send(await legends(`${req.params.id}`));
};

app.get("/:id", getScript);

export default app;
