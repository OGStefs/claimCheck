// import azukiContract from "../../blockchain/abi/azukiAbi.js";
// import { safeToFile } from "../safeToFile.js";
// import { getEns } from "../getENS.js";
// import { web3 } from "../web3Init.js";
// import { saveAzukiSnapshot } from "../../controllers/azukiController.js";

// const ownerOf = async (supply) => {
//   const start = Date.now();

//   let ownerArray = [];
//   try {
//     for (let i = 1; i < supply; i++) {
//       const owner = await azukiContract(web3).methods.ownerOf(i).call();
//       if (ownerArray.some((item) => item.wallet === owner)) {
//         const ownerIndex = ownerArray.findIndex((p) => p.wallet === owner);
//         ownerArray[ownerIndex].items.push(i);
//         ownerArray[ownerIndex].count++;
//       } else {
//         const ownerEns = await getEns(owner);
//         ownerArray.push({ wallet: owner, ens: ownerEns, count: 1, items: [i] });
//       }
//     }
//     const end = (Date.now() - start) / 1000;
//     return { ownerArray, duration: end };
//   } catch (error) {
//     return { error: error.message, message: "from ownerOfAzukis" };
//   }
// };

// const supply = 3334;

// export const fetchAzukis = async () => {
//   const azukis = await ownerOf(supply);
//   safeToFile(azukis.ownerArray, "azukis");
//   saveAzukiSnapshot(azukis);
// };
