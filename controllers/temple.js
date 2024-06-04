const {
  addTemple,
  getTempleById,
  getTempleSuggestions,
  addMedia,
  findTempleMedia,
} = require("../repository/temple");

/*
      { timing: 8, label: "8 AM", color: "#FFB800" },
      { timing: 15, label: "", color: "#FF9900" },
      { timing: 20, label: "", color: "#FF730D" },
      { timing: 15, label: "12 PM", color: "#FF730D" },
      { timing: 5, label: "", color: "#25FF20" },
      { timing: 15, label: "", color: "#FF730D" },
      { timing: 25, label: "3 PM", color: "#FA1111" },
      { timing: 15, label: "", color: "#FF8C00" },
      { timing: 15, label: "5 PM", color: "#FF8C00" },
      { timing: 0, label: "", color: "#DF5353" },
*/
const colors = new Map();
colors.set("VERYHIGH", "#FF730D");
colors.set("HIGH", "#FF9900");
colors.set("MEDIUM", "#FFB800");
colors.set("LOW", "#25FF20");
colors.set("BASE", "#25FF20");

const labels = new Map();
labels.set("8AM", "8 AM");
labels.set("5PM", "5 PM");
labels.set("8PM", "8 PM");
labels.set("12PM", "12 PM");

const timings = new Map();
timings.set("VERYHIGH", 20);
timings.set("HIGH", 15);
timings.set("MEDIUM", 10);
timings.set("LOW", 5);
timings.set("BASE", 0);

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
    const crowdObj = getCrowdInfo(temple);
    console.log(crowdObj);
    temple.crowded = crowdObj;
    res.json({
      status: "success",
      data: temple,
    });
  });
};

const getCrowdInfo = (temple) => {
  const crowdObj = [];
  labels.forEach((value, key) => {
    console.log(key, temple.crowded[key]);
    const crowdVal = temple.crowded[key].toUpperCase();
    crowdObj.push({
      timing: timings.get(crowdVal),
      label: value,
      color: colors.get(crowdVal),
    });
  });
  return crowdObj;
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
      tabs: items.tab[i].split(","),
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
