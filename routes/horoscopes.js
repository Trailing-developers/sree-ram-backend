const express = require("express");
const router = express.Router();

const { getSigns } = require("../controllers/horoscope");

router.post("/signs", getSigns);

module.exports = router;
