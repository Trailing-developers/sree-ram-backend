const FreeAstrologyClient = require("./../client/free_astrology_client");
require("dotenv").config();

const API_KEY = process.env.RAPID_API_KEY;
const BASE_URL = "https://local-business-data.p.rapidapi.com/";
const headers = {
  "x-rapidapi-host": "local-business-data.p.rapidapi.com",
  "x-rapidapi-key": API_KEY,
};
const client = new FreeAstrologyClient(API_KEY, BASE_URL, headers);
const limit = 30;
const region = "in";
const language = "en";

const getNearbyTempleFromRepo = async (lat, lng) => {
  const uri = `search-nearby?query=temples&lat=${lat}&lng=${lng}&limit=${limit}&language=${language}&region=${region}`;
  const response = await client.get(uri, uri);
  return response;
};

const getNearbyHotelsFromRepo = async (lat, lng) => {
  const uri = `search-nearby?query=hotels+&+restaurants&lat=${lat}&lng=${lng}&limit=${limit}&language=${language}&region=${region}`;
  const response = await client.get(uri, uri);
  return response;
};

module.exports = {
  getNearbyTempleFromRepo,
  getNearbyHotelsFromRepo,
};
