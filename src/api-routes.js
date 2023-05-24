import { usersApi } from "./api/users-api.js";
import { trailsApi } from "./api/trails-api.js";
import { placemarksApi } from "./api/placemarks-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: usersApi.find },
  { method: "POST", path: "/api/users", config: usersApi.create },
  { method: "DELETE", path: "/api/users", config: usersApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: usersApi.findOne },
  { method: "POST", path: "/api/users/authenticate", config: usersApi.authenticate },

  { method: "GET", path: "/api/trails", config: trailsApi.findAll },
  { method: "GET", path: "/api/placemarks/{id}/trails", config: trailsApi.findByPlacemark },
  { method: "POST", path: "/api/placemarks/{id}/trails", config: trailsApi.updateTrail },
  { method: "DELETE", path: "/api/trails", config: trailsApi.deleteAll },

  { method: "GET", path: "/api/placemarks", config: placemarksApi.find },
  { method: "GET", path: "/api/placemarks/{id}", config: placemarksApi.findOne },
  { method: "POST", path: "/api/placemarks", config: placemarksApi.create },
  { method: "DELETE", path: "/api/placemarks/{id}", config: placemarksApi.deleteOne },
  { method: "DELETE", path: "/api/candidates", config: placemarksApi.deleteAll },
];
