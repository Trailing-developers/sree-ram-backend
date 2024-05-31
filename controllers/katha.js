const data = require("../mocks/index");
const { addKatha, getAllKathas, getKathaById } = require("../repository/katha");
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

const createKatha = (req, res) => {
  const body = req.body;
  body.content = body.content.split(",");
  const response = addKatha(body);
  res.json({ message: body });
};

module.exports = {
  getKathaList,
  createKatha,
  getKathaPage,
};
