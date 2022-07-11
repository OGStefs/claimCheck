import fs from "fs";

export const safeToFile = async (json, collection = "wallets") => {
  var jsonContent = JSON.stringify(json);
  console.log("SAFETOFILE: ", jsonContent);
  fs.writeFile(
    `./src/storage/${collection}.json`,
    // `${collection}.json`,

    jsonContent,
    "utf8",
    function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log(`JSON file for ${collection} has been saved.`);
    }
  );
  return;
};
