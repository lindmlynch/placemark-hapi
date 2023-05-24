import { db } from "../models/db.js";

export const trailsController = {
  index: {
    handler: async function (request, h) {
      const placemarks = await db.placemarkStore.getAllPlacemarks();
      return h.view("Update", { title: "Update Trail Details", placemarks: placemarks });
    },
  },
  report: {
    handler: async function (request, h) {
      const trails = await db.trailStore.getAllTrails();
      return h.view("Report", {
        title: "Trail Info",
        trails: trails,
      });
    },
  },
  update: {
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const rawPlacemark = request.payload.placemark.split(",");
        const placemark = await db.placemarkStore.findByName(rawPlacemark[0], rawPlacemark[1]);
        await db.trailStore.update(request.payload.time, request.payload.method, loggedInUser._id, placemark._id, request.payload.img);
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
};
