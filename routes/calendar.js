const express = require("express");
const { getDatesInMonth } = require("../controllers/calendar");
const router = express.Router();

router.get("/calendar/year/:year/month/:month", getDatesInMonth);

module.exports = router;
