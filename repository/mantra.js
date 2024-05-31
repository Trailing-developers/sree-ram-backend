const prisma = require("../prisma/client");

const getAllMantras = async () => {
  const mantras = await prisma.katha.findMany({
    where: {
      type: "mantra",
    },
  });
  return mantras;
};

module.exports = {
  getAllMantras,
};
