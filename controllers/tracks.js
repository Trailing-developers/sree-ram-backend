const { addSongsToRepo } = require("../repository/tracks");

const addSong = (req, res) => {
  const body = createBody(req.body);
  addSongsToRepo(body)
    .then((data) => {
      res.json({ success: true, data: data });
    })
    .catch((ex) => {
      console.log(ex);
      res.json({ success: false, data: ex });
    });
};

function createBody(items) {
  const songBody = [];
  for (let i = 0; i < items.title.length; i++) {
    songBody.push({
      title: items.title[i],
      artwork: items.artwork[i],
      url: items.url[i],
      artist: items.artist[i],
    });
  }
  return songBody;
}

module.exports = {
  addSong,
};
