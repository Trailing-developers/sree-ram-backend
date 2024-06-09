const express = require("express");
const { addSong } = require("../controllers/tracks");
const router = express.Router();

router.post("/song", addSong);

module.exports = router;
