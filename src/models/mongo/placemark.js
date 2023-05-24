import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = Schema({
  name: String,
  trailType: String,
  length: Number,
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
