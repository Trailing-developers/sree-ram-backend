const prisma = require("../prisma/client");

const addSongsToRepo = async (body) => {
  const songs = await prisma.songs.createManyAndReturn({
    data: body,
    skipDuplicates: true,
  });
  return songs;
};

module.exports = {
  addSongsToRepo,
};
