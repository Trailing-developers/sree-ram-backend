const prisma = require("../prisma/client");

const responseToTempleMapper = (templeResponse) => {
  console.log(templeResponse);
  //add address to address table
  //add photos to media table
  //add temple data to temple table
};

module.exports = {
  responseToTempleMapper,
};
