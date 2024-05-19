const express = require("express");
const router = express.Router();

const { getMantras, createMantra } = require("../controllers/mantra");

router.get("/mantras", getMantras).post("/mantra", createMantra);

module.exports = router;
