const data = require("../mocks/index");
const { addKatha, getAllKathas } = require("../repository/katha");
const getKathaList = (req, res) => {
  getAllKathas()
    .then((katha) => {
      res.json(katha);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
};

const createKatha = (req, res) => {
  const { title, content, image } = req.body;
  const lines = content.split(",");
  console.log(lines);
  const response = addKatha({ title, lines, image });
  res.json({ message: "Katha created successfully." });
};

module.exports = {
  getKathaList,
  createKatha,
};
