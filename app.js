import express from "express";
import cors from "cors";

import routes from "./src/routes/index.js";

// start fetching data in the background:
// import "./src/utils/fetchInvaders.js";

const app = express();

app.use(cors());

app.use("/", routes);

export default app;
