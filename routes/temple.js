const express = require("express");
const { createTemple } = require("../controllers/temple");
const router = express.Router();

router.post("/temple", createTemple);

module.exports = router;
