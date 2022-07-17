import azukiContract from "../blockchain/abi/azukiAbi.js";
import legendsContract from "../blockchain/abi/legendsAbi.js";
import invadersContract from "../blockchain/abi/invadersAbi.js";

// import { safeToFile } from "../safeToFile.js";
import { getEns } from "../utils/getENS.js";

import Azuki from "../models/Azuki.js";
import Invader from "../models/Invader.js";
import Legend from "../models/Legend.js";

import { web3 } from "../utils/web3Init.js";

export const saveSnapshot = async (items, collection) => {
  try {
    const entity = {
      snapshot: {
        entries: items.ownerArray,
      },
      duration: items.duration,
    };
    if (entity.duration) {
      switch (collection) {
        case "azukis":
          await Azuki(entity).save();
          break;
        case "invaders":
          await Invader(entity).save();
          break;
        case "legends":
          await Legend(entity).save();
          break;
      }
      console.log(`${collection} Snaphot saved`);
    } else {
      console.log(`An error occured,  ${collection} not saved`);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const ownerOf = async (supply, collection) => {
  const start = Date.now();

  let owner;
  let ownerArray = [];
  try {
    for (let i = 1; i < supply; i++) {
      switch (collection) {
        case "azukis":
          owner = await azukiContract(web3).methods.ownerOf(i).call();
          break;
        case "legends":
          owner = await legendsContract(web3).methods.ownerOf(i).call();
          break;
        case "invaders":
          owner = await invadersContract(web3).methods.ownerOf(i).call();
          break;
      }
      console.log(i, owner);
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
    return { error: error.message, message: `from ${collection}` };
  }
};

const supply = 3334;

export const getPartners = async (collection) => {
  console.log(collection);
  const ownerList = await ownerOf(supply, collection);
  console.log(ownerList);
  await saveSnapshot(ownerList, collection);
  // safeToFile(azukis.ownerArray, "azukis");
};
