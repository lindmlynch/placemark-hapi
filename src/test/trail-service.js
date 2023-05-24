import axios from "axios";
import { serviceUrl } from "./fixtures.js";

export const trailService = {
  trailUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.trailUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.trailUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.trailUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.trailUrl}/api/users`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.trailUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },

  async updateTrail(id, trail) {
    const response = await axios.post(`${this.trailUrl}/api/placemarks/${id}/trails`, trail);
    return response.data;
  },

  async getTrails(id) {
    const response = await axios.get(`${this.trailUrl}/api/placemarks/${id}/trails`);
    return response.data;
  },

  async createPlacemark(newPlacemark) {
    const response = await axios.post(`${this.trailUrl}/api/placemarks`, newPlacemark);
    return response.data;
  },
};
