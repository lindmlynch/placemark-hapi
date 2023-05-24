import Boom from "@hapi/boom";
import { Placemark } from "../models/mongo/placemark.js";

export const placemarksApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const placemarks = await Placemark.find();
      return placemarks;
    },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = await Placemark.findOne({ _id: request.params.id });
        if (!placemark) {
          return Boom.notFound("No Placemark with this id");
        }
        return placemark;
      } catch (err) {
        return Boom.notFound("No Placemark with this id");
      }
    },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const newPlacemark = new Placemark(request.payload);
      const placemark = await newPlacemark.save();
      if (placemark) {
        return h.response(placemark).code(201);
      }
      return Boom.badImplementation("error creating placemark");
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      await Placemark.remove({});
      return { success: true };
    },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const response = await Placemark.deleteOne({ _id: request.params.id });
      if (response.deletedCount == 1) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },
};
