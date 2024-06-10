const express = require("express");
const {
  addSong,
  getSongSuggestion,
  addTrack,
  getTrack,
} = require("../controllers/tracks");
const router = express.Router();

router
  .post("/song", addSong)
  .get("/songs/suggestion", getSongSuggestion)
  .get("/track/:trackId", getTrack)
  .post("/track", addTrack);

module.exports = router;
