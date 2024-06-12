const prisma = require("../prisma/client");

const responseToTempleMapper = (templeResponse) => {
  console.log(templeResponse);
  //add address to address table
  addToAddress(templeResponse);
  //add photos to media table
  addToPhotos(templeResponse);
  //add temple data to temple table
  addTemple(templeResponse);
};

const addToAddress = (res) => {};
const addToPhotos = (res) => {};
const addTemple = (res) => {};

module.exports = {
  responseToTempleMapper,
};
