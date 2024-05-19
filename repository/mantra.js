const prisma = require("../prisma/client");

const getAllMantras = async () => {
  const mantras = await prisma.mantra.findMany();
  return mantras;
};

module.exports = {
  getAllMantras,
};
