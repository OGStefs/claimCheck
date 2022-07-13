import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const legendSchema = mongoose.Schema({
  //   name: {
  //     type: String,
  //     trim: true,
  //     required: "Name is required!",
  //   },
  created: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number,
  },
  snapshot: {
    entries: [{}],
    // required: "Snapshot is required",
  },
  //   days: [{ type: Number }],

  //   images: [{ type: String }],
});

const Legend = mongoose.model("Legend", legendSchema);

export default Legend;
