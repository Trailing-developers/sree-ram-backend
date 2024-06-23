const express = require("express");
const router = express.Router();

const {
  getKathaList,
  createKatha,
  getKathaPage,
  getKathaSuggestion,
  addKathaMedia,
  findMediaByKathaId,
  getAllKathaList,
} = require("../controllers/katha");

router
  .get("/kathas/type/:type", getKathaList)
  .get("/kathas", getAllKathaList)
  .post("/katha/media", addKathaMedia)
  .get("/media/katha/:kathaId", findMediaByKathaId)
  .get("/katha/suggest", getKathaSuggestion)
  .get("/katha/:id", getKathaPage)
  .post("/katha", createKatha);

module.exports = router;
