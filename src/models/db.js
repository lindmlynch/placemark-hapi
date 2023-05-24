import { userMongoStore } from "./mongo/user-mongo-store.js";
import { trailMongoStore } from "./mongo/trail-mongo-store.js";
import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  trailStore: null,
  placemarkStore: null,

  init(storeType) {
    switch (storeType) {
      case "mongo":
        this.userStore = userMongoStore;
        this.trailStore = trailMongoStore;
        this.placemarkStore = placemarkMongoStore;
        connectMongo();
        break;
      default:
    }
  },
};
