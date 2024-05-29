const { addTemple, getTempleById } = require("../repository/temple");

const createTemple = (req, res) => {
  const items = req.body;
  console.log(JSON.stringify(items));
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

module.exports = {
  createTemple,
  getTemple,
};
