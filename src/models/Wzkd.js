import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const wzkdSchema = mongoose.Schema({
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

const Wzkd = mongoose.model("Wzkd", wzkdSchema);

export default Wzkd;
