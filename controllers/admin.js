const updateSuccess = (req, res) => {
  res.render("success", { name: "Great!" });
};

module.exports = {
  updateSuccess,
};
