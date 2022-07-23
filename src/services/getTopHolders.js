import Azuki from "../models/Azuki.js";
import BekxArt from "../models/BekxArt.js";
import Invader from "../models/Invader.js";
import Legend from "../models/Legend.js";
import Tiger from "../models/Tiger.js";

const all = async (collections) => {
  let topHolders = [];

  Object.keys(collections).forEach((key) => {
    const collection = key;
    const entries = collections[key].snapshot.entries;

    try {
      for (let i = 0; i < entries.length; i++) {
        if (topHolders.some((item) => item.wallet === entries[i].wallet)) {
          const ownerIndex = topHolders.findIndex(
            (p) => p.wallet === entries[i].wallet
          );
          topHolders[ownerIndex].collections[collection] =
            entries[i].items.length;
          topHolders[ownerIndex].total += entries[i].items.length;
        } else {
          const newHolder = {
            wallet: entries[i].wallet,
            ens: entries[i].ens,
          };
          newHolder.collections = {};
          newHolder.collections[collection] = entries[i].items.length;
          newHolder.total = entries[i].items.length;

          topHolders.push(newHolder);
        }
      }
    } catch (error) {
      return { error: error.message, message: `from ${collections}` };
    }
  });
  return topHolders.sort((a, b) => b.total - a.total).slice(0, 100);
};

export const TopHolders = async () => {
  const azukis = await Azuki.findOne().sort("-_id");
  const legends = await Legend.findOne().sort("-_id");
  const invaders = await Invader.findOne().sort("-_id");
  const bekxArt = await BekxArt.findOne().sort("-_id");
  const tigers = await Tiger.findOne().sort("-_id");

  const topHolders = await all({ azukis, legends, invaders, bekxArt, tigers });
  return topHolders;
};
