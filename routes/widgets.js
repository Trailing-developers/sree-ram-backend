const express = require("express");
const { createHomeBanner, getHome } = require("../controllers/widget");
const router = express.Router();

router.post("/home_banner", createHomeBanner).get("/home", getHome);

module.exports = router;
