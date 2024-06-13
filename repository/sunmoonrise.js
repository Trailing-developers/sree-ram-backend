const FreeAstrologyClient = require("./../client/free_astrology_client");
require("dotenv").config();

const API_KEY = process.env.IPGEOLOCATION_API;

const client = new FreeAstrologyClient(
  null,
  "http://api.weatherapi.com/v1/astronomy.json?"
);

const getSunMoonRise = async (location, date) => {
  const response = await client.get(
    `key=${API_KEY}&q=${location}&dt=${date}`,
    `key=_KEY&q=${location}&dt=${date}`
  );
  return response;
};

module.exports = {
  getSunMoonRise,
};
