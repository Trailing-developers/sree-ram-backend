const express = require("express");
const router = express.Router();

const { getMantras } = require("../controllers/mantra");

router.get("/mantras", getMantras);

module.exports = router;
