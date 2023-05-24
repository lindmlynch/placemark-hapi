export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2a$10$v3SOLI53B7wd9c8slGCfMeWlJmZi2q9VVtL.hhfmygzz0flRgzBv2",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2a$10$B1DFnX19Pl.HM8K6AqJRpu.sfEhdan1dwajliX6qTNUzMa.fjDm.u",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "$2a$10$Kf6fCmdDSibmR0/SeP/3Cu1WkBvoOqfg/LyJLQXDIZg245HbUilbO",
    },
  },
  placemarks: {
    _model: "Placemark",
    fenit: {
      name: "Fenit",
      trailType: "Greenway",
      length: 14,
    },
    bolus: {
      name: "Bolus",
      trailType: "Loop",
      length: 7.5,
    },
  },
  trails: {
    _model: "Trail",
    one: {
      time: 2,
      method: "walk",
      lat: "51.766676",
      lng: "-10.333333",
      user: "->users.bart",
      img: "images/bolus.jpg",
      placemark: "->placemarks.bolus",
    },
    two: {
      time: 1,
      method: "cycle",
      lat: "52.278405",
      lng: "-9.861211",
      img: "images/fenit.jpg",
      user: "->users.marge",
      placemark: "->placemarks.fenit",
    },
    three: {
      time: 3,
      method: "walk",
      lat: "52.274147",
      lng: "-9.699932",
      user: "->users.homer",
      img: "images/fenit.jpg",
      placemark: "->placemarks.fenit",
    },
  },
};
