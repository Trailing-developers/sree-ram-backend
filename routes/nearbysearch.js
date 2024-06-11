const express = require("express");
const {
  getNearbyHotels,
  getNearbyTemples,
} = require("../controllers/nearbysearch");
const router = express.Router();

router.get("/search-nearby/temples", getNearbyTemples);
router.get("/search-nearby/hotels", getNearbyHotels);

module.exports = router;
