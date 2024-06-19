const FreeAstrologyClient = require("./../client/free_astrology_client");
const { responseToTempleMapper } = require("./templemapper");
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
  // responseToTempleMapper(reponse);
  return response;
};

const getNearbyHotelsFromRepo = async (lat, lng) => {
  const uri = `search-nearby?query=hotels+&+restaurants&lat=${lat}&lng=${lng}&limit=${limit}&language=${language}&region=${region}`;
  const response = await client.get(uri, uri);
  response.data = response.data.slice(0, 5).map((result) => ({
    name: result.name,
    type: result.type,
    address: result.address,
    rating: result.rating,
    image: result.photos_sample[0].photo_url_large,
  }));
  return response;
};

const getNearbyAshramFromRepo = async (lat, lng) => {
  const uri = `search-nearby?query=ashram&lat=${lat}&lng=${lng}&limit=${limit}&language=${language}&region=${region}`;
  const response = await client.get(uri, uri);
  response.data = response.data.slice(0, 5).map((result) => ({
    name: result.name,
    type: result.type,
    address: result.address,
    rating: result.rating,
    image: result.photos_sample[0].photo_url_large,
  }));
  return response;
};

module.exports = {
  getNearbyTempleFromRepo,
  getNearbyHotelsFromRepo,
  getNearbyAshramFromRepo,
};
