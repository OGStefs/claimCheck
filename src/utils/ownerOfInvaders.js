import invadersContract from "../blockchain/abi/invadersAbi.js";
import { web3 } from "../utils/web3Init.js";
import { walletCheck } from "./getPartnersInWallet.js";

const ownerOfInvaders = async (supply) => {
  let allOwners = {};
  try {
    for (let i = 1; i < supply; i++) {
      if (i % 10 === 0) console.log(i);
      const owner = await invadersContract(web3).methods.ownerOf(i).call();
      if (owner in allOwners) {
        allOwners[owner].invaders.items.push(i);
        allOwners[owner].invaders.count++;
      } else {
        allOwners[owner] = { invaders: { count: 1, items: [i] } };
      }
    }
    return allOwners;
  } catch (error) {
    return { error: error.message, message: "from ownerOfInvaders" };
  }
};

const getTotalSupply = async () => {
  try {
    let supply = await invadersContract(web3).methods.getTotalSupply().call();
    // first invader tokens start at 1 -> need to increment suply by 1:
    supply++;

    return supply;
  } catch (error) {
    return { error: error.message, message: "from getTotalSupply" };
  }
};

const partnersInWallet = async (owners) => {
  const partners = {};
  try {
    for (const owner of Object.keys(owners)) {
      const wallet = await walletCheck(owner);
      partners[owner] = {
        invaders: owners[owner].invaders,
        legends: { count: wallet.legends.length, items: wallet.legends },
        azukis: { count: wallet.azukis.length, items: wallet.azukis },
        tigers: { count: wallet.tigers.length, items: wallet.tigers },
      };
    }
    return partners;
  } catch (error) {}
};

export const ownerWallets = async () => {
  try {
    const start = Date.now();
    const supply = await getTotalSupply();
    const step1 = Date.now() - start;
    console.log("supply: ", step1, "Milliseconds");
    const owners = await ownerOfInvaders(supply);
    const step2 = Date.now() - start;
    console.log("owners: ", step2 / 1000, "seconds");
    const partners = await partnersInWallet(owners);
    const step3 = Date.now() - start;
    console.log("partners: ", step3 / 1000, "seconds");
    return partners;
  } catch (error) {
    return { error: error.message, message: "from ownerWallets" };
  }
};
