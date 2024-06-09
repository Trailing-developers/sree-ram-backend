const prisma = require("../prisma/client");

const addSign = async (body) => {
    console.log(body);
  const signs = await prisma.horoscope.create({
    data: body
  });
  return signs;
};

module.exports = {
  addSign
};
