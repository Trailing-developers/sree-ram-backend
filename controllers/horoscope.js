const { addSign } = require("../repository/horoscope");

const getSigns = (req, res) => {
  addSign(req.body)
    .then((signs) => {
      console.log(signs);
      res.json(signs);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

module.exports = {
  getSigns,
};