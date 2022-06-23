import dotenv from "dotenv";

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split(".").map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log(
    "You're on an older version of node! Please go to nodejs.org and download version 7.6 or greater. 👌\n "
  );
  process.exit();
}

dotenv.config({ path: "./.env" });

import app from "./app.js";
app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
