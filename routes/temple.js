const express = require("express");
const {
  createTemple,
  getTemple,
  getTempleSuggestion,
  addTempleMedia,
  findMediaByTempleId,
} = require("../controllers/temple");
const router = express.Router();

router
  .post("/temple", createTemple)
  .post("/temple/media", addTempleMedia)
  .get("/temple/suggest", getTempleSuggestion)
  .get("/temple/media/:templeId", findMediaByTempleId)
  .get("/temple/:templeId", getTemple);

module.exports = router;
