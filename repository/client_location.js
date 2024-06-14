const FreeAstrologyClient = require("./../client/free_astrology_client");
require("dotenv").config();

const API_KEY = process.env.GETGEOIP;
const BASE_URL = "https://api.getgeoapi.com/";
const client = new FreeAstrologyClient(null, BASE_URL, null);

const getUserLocationFromIp = async (ip) => {
  try {
    const endpoint = `v2/ip/${ip}?api_key=${API_KEY}&format=json`;
    const key = `v2/ip/${ip}?api_key=_&format=json`;
    const resp = await client.get(endpoint, key);
    return resp;
  } catch (e) {
    console.log(e);
  }
  return null;
};

module.exports = {
  getUserLocationFromIp,
};
