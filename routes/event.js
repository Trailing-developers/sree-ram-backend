const express = require("express");
const {
  createEvent,
  getEventsById,
  getEventsBwDays,
} = require("../controllers/event");
const router = express.Router();

router
  .post("/event", createEvent)
  .get("/event/start/:start/end/:end", getEventsBwDays)
  .get("/event/:eventId", getEventsById);

module.exports = router;
