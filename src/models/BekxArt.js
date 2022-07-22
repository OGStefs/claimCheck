import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const bekxArtSchema = mongoose.Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number,
  },
  snapshot: {
    entries: [{}],
  },
});

const BekxArt = mongoose.model("BekxArt", bekxArtSchema);

export default BekxArt;
