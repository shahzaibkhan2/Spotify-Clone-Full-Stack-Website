import mongoose, { Schema } from "mongoose";

const albumSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Album = mongoose.models.Album || mongoose.model("Album", albumSchema);

export default Album;
