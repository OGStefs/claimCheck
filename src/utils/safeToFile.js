import fs from "fs";

export const safeToFile = async (json) => {
  var jsonContent = JSON.stringify(json);
  console.log("SAFETOFILE: ", jsonContent);
  fs.writeFile(
    "./src/storage/wallets.json",
    jsonContent,
    "utf8",
    function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log("JSON file has been saved.");
    }
  );
};
