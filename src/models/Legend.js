import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const legendSchema = mongoose.Schema({
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

const Legend = mongoose.model("Legend", legendSchema);

export default Legend;
