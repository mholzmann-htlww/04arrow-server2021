module.exports = function (req, res) {
  const msg = `ERROR !!!! Resource ${req.method} ${req.originalUrl} not found!`;
  console.error(msg);
  res.send(msg);
};
