import azukiContract from "../blockchain/abi/azukiAbi.js";
import legendsContract from "../blockchain/abi/legendsAbi.js";
import invadersContract from "../blockchain/abi/invadersAbi.js";
import bekxArtContract from "../blockchain/abi/bekxArtAbi.js";
import tigersContract from "../blockchain/abi/tigersAbi.js";
import wzkdContract from "../blockchain/abi/wzkdAbi.js";

// import { safeToFile } from "../safeToFile.js";
import { getEns } from "../utils/getENS.js";

import Azuki from "../models/Azuki.js";
import Invader from "../models/Invader.js";
import Legend from "../models/Legend.js";
import BekxArt from "../models/BekxArt.js";

import { web3 } from "../utils/web3Init.js";
import Tiger from "../models/Tiger.js";
import Wzkd from "../models/Wzkd.js";

export const saveSnapshot = async (items, collection) => {
  try {
    let entity = {
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
        case "bekxArt":
          await BekxArt(entity).save();
          break;
        case "tigers":
          await Tiger(entity).save();
          break;
        case "wzkd":
          await Wzkd(entity).save();
          break;
      }
      console.log(`${collection} Snaphot saved`);
      entity = {};
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
        case "bekxArt":
          owner = await bekxArtContract(web3).methods.ownerOf(i).call();
          break;
        case "tigers":
          owner = await tigersContract(web3)
            .methods.ownerOf(i - 1)
            .call();
          break;
        case "wzkd":
          owner = await wzkdContract(web3).methods.ownerOf(i).call();
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

const collectionSupply = (collection) => {
  switch (collection) {
    case "azukis":
    case "legends":
    case "invaders":
      return 3334;
    case "bekxArt":
      return 113;
    case "tigers":
      return 3901;
    case "wzkd":
      return 4322;
  }
};

export const getPartners = async (collection) => {
  console.log(collection);
  const supply = collectionSupply(collection);
  const ownerList = await ownerOf(supply, collection);
  await saveSnapshot(ownerList, collection);
  // safeToFile(azukis.ownerArray, "azukis");
};
