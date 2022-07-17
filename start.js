import dotenv from "dotenv";
import mongoose from "mongoose";

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split(".").map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log(
    "You're on an older version of node! Please go to nodejs.org and download version 7.6 or greater. 👌\n "
  );
  process.exit();
}

dotenv.config({ path: "./.env" });

// show environment in console
console.log(app.get("env"));

import app from "./app.js";
// import { fetchInvaders } from "./src/utils/fetchInvaders.js";

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .then(() => {
    app.set("port", process.env.PORT || 7777);
    const server = app.listen(app.get("port"), () => {
      console.log(`Express running → PORT ${server.address().port}`);
    });
  })
  // TODO: find a secure solution to run the fetch script at the right moment (and independent from the main task)
  .then(() => {
    // fetchInvaders();
  });

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → MongoDB ERROR${err.message}`);
});
