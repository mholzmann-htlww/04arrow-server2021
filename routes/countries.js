const express = require("express");
const router = express.Router();

const countries = require("../model/countries.json");

/* countries users listing. */
router.get("/test", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/first/:name", function (req, res, next) {
  res.send(countries.find((c) => c.name.startsWith(req.params.name)));
});

module.exports = router;
