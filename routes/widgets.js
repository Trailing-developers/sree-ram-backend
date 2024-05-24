const express = require("express");
const {
  createHomeBanner,
  getHome,
  createCalanderBanner,
  createDarshanBanner,
  getDarshan,
  createDarshanWidgets,
} = require("../controllers/widget");
const router = express.Router();

router
  .post("/home_banner", createHomeBanner)
  .post("/calendar_banner", createCalanderBanner)
  .post("/darshan_banner", createDarshanBanner)
  .post("/darshan_widgets", createDarshanWidgets)
  .get("/home", getHome)
  .get("/darshan", getDarshan);

module.exports = router;
