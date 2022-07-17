import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const invaderSchema = mongoose.Schema({
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

const Invader = mongoose.model("Invader", invaderSchema);

export default Invader;
