import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  async findById(id) {
    const placemark = await Placemark.findOne({ _id: id }).lean();
    return placemark;
  },

  async findByName(trailType, name) {
    const placemark = await Placemark.findOne({
      trailType,
      name,
    });
    return placemark;
  },
};
