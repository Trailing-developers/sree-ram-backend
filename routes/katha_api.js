const express = require("express");
const router = express.Router();

const { getKathaList, createKatha } = require("../controllers/katha");

router.get("/kathas", getKathaList).post("/katha", createKatha);

module.exports = router;
