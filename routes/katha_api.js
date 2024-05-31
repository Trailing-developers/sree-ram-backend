const express = require("express");
const router = express.Router();

const {
  getKathaList,
  createKatha,
  getKathaPage,
} = require("../controllers/katha");

router
  .get("/kathas/type/:type", getKathaList)
  .get("/katha/:id", getKathaPage)
  .post("/katha", createKatha);

module.exports = router;
