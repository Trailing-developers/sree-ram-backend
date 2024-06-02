const express = require("express");
const router = express.Router();

const {
  getKathaList,
  createKatha,
  getKathaPage,
  getKathaSuggestion,
  addKathaMedia,
  findMediaByKathaId,
} = require("../controllers/katha");

router
  .get("/kathas/type/:type", getKathaList)
  .post("/katha/media", addKathaMedia)
  .get("/katha/media/:kathaId", findMediaByKathaId)
  .get("/katha/suggest", getKathaSuggestion)
  .get("/katha/:id", getKathaPage)
  .post("/katha", createKatha);

module.exports = router;
