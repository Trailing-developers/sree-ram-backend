const express = require("express");
const { createEvent, getEventsById } = require("../controllers/event");
const router = express.Router();

router.post("/event", createEvent).get("/event/:eventId", getEventsById);

module.exports = router;
