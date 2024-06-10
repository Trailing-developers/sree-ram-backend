const prisma = require("../prisma/client");

const addSongsToRepo = async (body) => {
  const songs = await prisma.songs.createManyAndReturn({
    data: body,
    skipDuplicates: true,
  });
  return songs;
};

const addTracksToRepo = async (body) => {
  const tracks = await prisma.tracks.create({
    data: {
      name: body.name,
      image: body.image,
      songs: {
        connect: body.song.map((id) => ({ id: parseInt(id) })),
      },
    },
  });
  return tracks;
};

const getTracksFromRepo = async (id) => {
  const tracks = await prisma.tracks.findFirst({
    where: { id: parseInt(id.trackId) },
    include: { songs: true },
  });
  return tracks;
};

const getSongSuggestionsFromRepo = async (query) => {
  const songs = await prisma.songs.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 10,
  });
  return songs;
};

module.exports = {
  addSongsToRepo,
  addTracksToRepo,
  getTracksFromRepo,
  getSongSuggestionsFromRepo,
};
