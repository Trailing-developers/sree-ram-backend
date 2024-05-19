const { getAllMantras, addMantra } = require("../repository/mantra");

const getMantras = (req, res) => {
  getAllMantras()
    .then((mantras) => {
      res.json(mantras);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const createMantra = (req, res) => {
  const { title, content, image } = req.body;
  const lines = content.split(",");
  console.log(lines);
  const response = addMantra({ title, lines, image });
  res.json({ message: "Mantra created successfully." });
};

module.exports = {
  getMantras,
  createMantra,
};
