const updateSuccess = (req, res) => {
  const { name, email } = req.body;
  res.render("success", { name: name });
};

const createOption = (req, res) => {
  const types = ["katha", "mantra"];
  res.render("create", { types });
};

const createPage = (req, res) => {
  const type = req.params.type;
  res.render(`create/add_${type}`, { type });
};

module.exports = {
  updateSuccess,
  createOption,
  createPage,
};
