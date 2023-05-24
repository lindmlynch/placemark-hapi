import Mongoose from "mongoose";

const { Schema } = Mongoose;

const trailSchema = new Schema({
  time: Number,
  method: String,
  lat: String,
  lng: String,
  img: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  placemark: {
    type: Schema.Types.ObjectId,
    ref: "Placemark",
  },
});

export const Trail = Mongoose.model("Trail", trailSchema);
