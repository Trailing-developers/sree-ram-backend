const { addTemple, getTempleById } = require("../repository/temple");

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

module.exports = {
  createTemple,
  getTemple,
};
