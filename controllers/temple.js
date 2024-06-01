const {
  addTemple,
  getTempleById,
  getTempleSuggestions,
  addMedia,
  findTempleMedia,
} = require("../repository/temple");

const createTemple = (req, res) => {
  const items = req.body;
  items.darshanTypes = createDarshanTypes(items.darshan.type);
  addTemple(items)
    .then((items) => {
      res.json({
        status: "success",
        message: items,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: "error",
        message: err,
      });
    });
};

const getTemple = (req, res) => {
  const { templeId } = req.params;
  getTempleById(templeId).then((temple) => {
    res.json({
      status: "success",
      data: temple,
    });
  });
};

const createDarshanTypes = (types) => {
  console.log(types);
  const darshanTypes = [];
  for (let i = 0; i < types.typeName.length; i++) {
    darshanTypes.push({
      amount: types.amount[i],
      timing: types.timing[i],
      typeName: types.typeName[i],
    });
  }
  return darshanTypes;
};

const getTempleSuggestion = (req, res) => {
  const query = req.query.q;
  getTempleSuggestions(query).then((temples) => {
    res.json({
      status: "success",
      data: temples,
    });
  });
};

const addTempleMedia = (req, res) => {
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

const findMediaByTempleId = (req, res) => {
  const { templeId } = req.params;
  findTempleMedia(templeId)
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
      templeId: parseInt(items.entityId[i]),
      media: items.media[i],
      entityType: "temple",
    });
  }
  return medias;
}

module.exports = {
  createTemple,
  addTempleMedia,
  getTemple,
  getTempleSuggestion,
  findMediaByTempleId,
};
