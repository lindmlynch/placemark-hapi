import bcrypt from "bcrypt";

import { db } from "../models/db.js";

const saltRounds = 10;

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("Main", { title: "Welcome to Kingdom Trails" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("Signup", { title: "Sign up for Kingdom Trails" });
    },
  },
  signup: {
    auth: false,
    handler: async function (request, h) {
      const user = request.payload;
      user.password = await bcrypt.hash(user.password, saltRounds);
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("Login", { title: "Login to Kingdom Trails" });
    },
  },
  login: {
    auth: false,
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (!user || !passwordsMatch) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/update");
    },
  },
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};
