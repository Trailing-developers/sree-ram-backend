const express = require("express");
const router = express.Router();

const { getKathaList } = require("../controllers/katha");

router.get("/kathas", getKathaList);

module.exports = router;
