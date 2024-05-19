const data = require("../mocks/index");

const getKathaList = (req, res) => {
  res.json(data.KATHA_LIST);
};

module.exports = {
  getKathaList,
};
