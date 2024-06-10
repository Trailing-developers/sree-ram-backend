const {
  addSongsToRepo,
  getSongSuggestionsFromRepo,
  addTracksToRepo,
  getTracksFromRepo,
} = require("../repository/tracks");

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

const addTrack = (req, res) => {
  const body = req.body;
  addTracksToRepo(body)
    .then((data) => {
      res.json({ success: true, data: data });
    })
    .catch((e) => {
      console.log(e);
      res.json({ success: false, message: e });
    });
};

const getTrack = (req, res) => {
  const trackId = req.params;
  getTracksFromRepo(trackId)
    .then((data) => res.json({ success: true, data: data }))
    .catch((e) => {
      console.log(e);
      res.json({ success: false, message: e });
    });
};

const getSongSuggestion = (req, res) => {
  const { q } = req.query;
  getSongSuggestionsFromRepo(q)
    .then((data) => {
      res.json({ success: true, data: data });
    })
    .catch((e) => {
      console.log(e);
      res.json({ success: false, message: e });
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
  addTrack,
  getTrack,
  getSongSuggestion,
};
