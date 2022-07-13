// import Web3 from "web3";
import azukiContract from "../../blockchain/abi/azukiAbi.js";
import { safeToFile } from "../safeToFile.js";
import { getEns } from "../getENS.js";
import { web3 } from "../web3Init.js";
import { saveAzukiSnapshot } from "../../controllers/azukiController.js";
// const web3 = new Web3(
//   new Web3.providers.WebsocketProvider("ws://192.168.178.57:8546/")
// );

const ownerOf = async (supply) => {
  // const bnr = await web3.eth.getBlockNumber();
  // console.log(bnr);
  const start = Date.now();

  let allOwners = {};
  let ownerArray = [];
  try {
    for (let i = 1; i < supply; i++) {
      const owner = await azukiContract(web3).methods.ownerOf(i).call();
      if (ownerArray.some((item) => item.wallet === owner)) {
        const ownerIndex = ownerArray.findIndex((p) => p.wallet === owner);
        ownerArray[ownerIndex].items.push(i);
        ownerArray[ownerIndex].count++;
      } else {
        const ownerEns = await getEns(owner);
        ownerArray.push({ wallet: owner, ens: ownerEns, count: 1, items: [i] });
      }
    }
    const end = (Date.now() - start) / 1000;
    return { ownerArray, duration: end };
  } catch (error) {
    return { error: error.message, message: "from ownerOfAzukis" };
  }
};

const supply = 3334;

export const fetchazukis = async () => {
  const azukis = await ownerOf(supply);
  safeToFile(azukis.ownerArray, "azukis");
  saveAzukiSnapshot(azukis);
};
