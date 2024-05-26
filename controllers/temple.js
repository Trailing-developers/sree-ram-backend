const createTemple = (req, res) => {
  const items = req.body;
  console.log(JSON.stringify(items));
  res.json({
    status: "success",
    message: "TEMPLE_BANNER created successfully.",
  });
};

module.exports = {
  createTemple,
};
