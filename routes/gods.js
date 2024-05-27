const express = require("express");
const { createGods, getGod, getGodSuggestion } = require("../controllers/gods");
const router = express.Router();

router
  .get("/gods/suggest", getGodSuggestion)
  .get("/gods/:godId", getGod)
  .post("/gods", createGods);

module.exports = router;
