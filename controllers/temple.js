const createTemple = (req, res) => {
  const items = req.body;
  console.log(JSON.stringify(items));
  res.json({
    status: "success",
    message: items,
  });
};

module.exports = {
  createTemple,
};
