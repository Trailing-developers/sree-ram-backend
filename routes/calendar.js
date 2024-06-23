const express = require("express");
const {
  getDatesInMonth,
  getEventsByDates,
} = require("../controllers/calendar");
const router = express.Router();

router
  .get("/calendar/year/:year/month/:month", getDatesInMonth)
  .get("/calendar/start/:start/end/:end", getEventsByDates);

module.exports = router;
