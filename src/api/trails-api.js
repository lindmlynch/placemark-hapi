import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const trailsApi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const trails = db.trailStore.getAllTrails();
      return trails;
    },
  },
  findByPlacemark: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const trails = await db.trailStore.getTrailsByPlacemark(request.params.id);
      return trails;
    },
  },

  updateTrail: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.findById(request.params.id);
      if (!placemark) {
        return Boom.notFound("No Placemark with this id");
      }
      const trail = await db.trailStore.update(
        request.payload.time,
        request.payload.method,
        request.auth.credentials,
        placemark,
        request.payload.lat,
        request.payload.lng,
        request.payload.img
      );
      return trail;
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      await db.trailStore.deleteAll();
      return { success: true };
    },
  },
};
