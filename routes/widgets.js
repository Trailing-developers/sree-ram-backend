const express = require("express");
const {
  createHomeBanner,
  getHome,
  createCalanderBanner,
} = require("../controllers/widget");
const router = express.Router();

router
  .post("/home_banner", createHomeBanner)
  .post("/calendar_banner", createCalanderBanner)
  .get("/home", getHome);

module.exports = router;
