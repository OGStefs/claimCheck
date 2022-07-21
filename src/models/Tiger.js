import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const tigerSchema = mongoose.Schema({
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

const Tiger = mongoose.model("Tiger", tigerSchema);

export default Tiger;
