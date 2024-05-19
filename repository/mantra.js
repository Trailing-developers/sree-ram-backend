const prisma = require("../prisma/client");

const getAllMantras = async () => {
  const mantras = await prisma.mantra.findMany();
  return mantras;
};

const addMantra = async (body) => {
  const { title, lines, image } = body;
  const mantra = await prisma.mantra.create({
    data: {
      title: title,
      content: lines,
      image: image,
    },
  });
  return mantra;
};

module.exports = {
  getAllMantras,
  addMantra,
};
