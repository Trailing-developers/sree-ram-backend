const { getAllMantras } = require("../repository/mantra");

const getMantras = (req, res) => {
  getAllMantras()
    .then((mantras) => {
      console.log(mantras);
      res.json(mantras);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

module.exports = {
  getMantras,
};
