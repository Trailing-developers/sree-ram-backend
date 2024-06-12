const express = require("express");
const {
  getNearbyHotels,
  getNearbyTemples,
  getNearbyAshram,
} = require("../controllers/nearbysearch");
const router = express.Router();

router
  .get("/search-nearby/temples", getNearbyTemples)
  .get("/search-nearby/hotels", getNearbyHotels)
  .get("/search-nearby/ashrams", getNearbyAshram);

module.exports = router;
