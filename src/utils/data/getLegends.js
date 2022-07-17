// // import Web3 from "web3";
// import legendsContract from "../../blockchain/abi/legendsAbi.js";
// import { safeToFile } from "../safeToFile.js";
// import { getEns } from "../getENS.js";
// import { web3 } from "../web3Init.js";
// import { saveLegendSnapshot } from "../../controllers/azukiController.js";

// // const web3 = new Web3(
// //   new Web3.providers.WebsocketProvider("ws://192.168.178.57:8546/")
// // );

// const ownerOf = async (supply) => {
//   const start = Date.now();

//   let allOwners = {};
//   let ownerArray = [];
//   try {
//     for (let i = 1; i < supply; i++) {
//       const owner = await legendsContract(web3).methods.ownerOf(i).call();

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
//     return { error: error.message, message: "from ownerOfLegends" };
//   }
// };

// const supply = 3334;

// export const fetchLegends = async () => {
//   const legends = await ownerOf(supply);
//   safeToFile(legends.ownerArray, "legends");
//   saveLegendSnapshot(legends);
// };
