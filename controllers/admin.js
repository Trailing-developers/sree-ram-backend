const updateSuccess = (req, res) => {
  const { name, email } = req.body;
  res.render("success", { name: name });
};

module.exports = {
  updateSuccess,
};
