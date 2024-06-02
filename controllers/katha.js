const data = require("../mocks/index");
const {
  addKatha,
  getAllKathas,
  getKathaById,
  getKathaSuggestions,
  findKathaMedia,
} = require("../repository/katha");
const { addMedia } = require("../repository/temple");
const getKathaList = (req, res) => {
  const { type } = req.params;
  getAllKathas(type)
    .then((katha) => {
      res.json(katha);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
};

const getKathaSuggestion = (req, res) => {
  const query = req.query.q;
  getKathaSuggestions(query).then((kathas) => {
    res.json({
      status: "success",
      data: kathas,
    });
  });
};

const getKathaPage = (req, res) => {
  const { id } = req.params;
  getKathaById(id)
    .then((katha) => {
      res.json(katha);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
};

const addKathaMedia = (req, res) => {
  const bb = createMediaBody(req.body);
  addMedia(bb)
    .then((resp) => {
      res.json({
        status: "success",
        data: resp,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: "failed",
        data: err,
      });
    });
};

const findMediaByKathaId = (req, res) => {
  const { kathaId } = req.params;
  findKathaMedia(kathaId)
    .then((resp) => {
      res.json({ status: "success", data: resp });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: "failed", message: err });
    });
};

function createMediaBody(items) {
  const medias = [];
  for (let i = 0; i < items.name.length; i++) {
    medias.push({
      name: items.name[i],
      kathaId: parseInt(items.entityId[i]),
      media: items.media[i],
      entityType: "katha",
      tabs: items.tab[i].split(","),
    });
  }
  return medias;
}

const createKatha = (req, res) => {
  const body = req.body;
  body.content = body.content.split(",");
  const response = addKatha(body);
  res.json({ message: body });
};

module.exports = {
  getKathaList,
  createKatha,
  addKathaMedia,
  getKathaPage,
  getKathaSuggestion,
  findMediaByKathaId,
};
