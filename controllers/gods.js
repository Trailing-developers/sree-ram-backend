const { getGodById, addGod, getGodSuggestions } = require("../repository/gods");

const createGods = (req, res) => {
  const items = req.body;
  addGod(items)
    .then((god) => {
      res.json({
        status: "success",
        message: "GOD created successfully.",
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

const getGod = (req, res) => {
  const { godId } = req.params;
  getGodById(godId).then((god) => {
    res.json({
      status: "success",
      data: god,
    });
  });
};

const getGodSuggestion = (req, res) => {
  const query = req.query.q;
  getGodSuggestions(query).then((god) => {
    res.json({
      status: "success",
      data: god,
    });
  });
};

module.exports = {
  createGods,
  getGod,
  getGodSuggestion,
};
