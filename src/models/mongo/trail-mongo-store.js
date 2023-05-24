import { Trail } from "./trail.js";

export const trailMongoStore = {
  async getAllTrails() {
    const trails = await Trail.find().populate("user").populate("placemark").lean();
    return trails;
  },

  async getTrailsByPlacemark(id) {
    const trails = await Trail.find({ placemark: id });
    return trails;
  },

  async update(time, method, user, placemark, lat, lng, img) {
    const newTrail = new Trail({
      time,
      method,
      user: user._id,
      placemark: placemark._id,
      lat,
      lng,
      img,
    });
    await newTrail.save();
    return newTrail;
  },

  async deleteAll() {
    await Trail.deleteMany({});
  },
};
