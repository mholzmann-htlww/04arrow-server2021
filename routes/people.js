var express = require("express");
var router = express.Router();

const peopleList = require("../model/people.json");

router.get("/", function (req, res, next) {
  res.send(peopleList);
});

router.get("/first/:color", function (req, res, next) {
  res.send(
    peopleList.find(
      (p) => p.color.toLowerCase() == req.params.color.toLowerCase()
    )
  );
});

router.get("/first/active/:score", function (req, res, next) {
  let result;

  if (req.query.order == "GT") {
    result = peopleList.find((p) => p.score > req.params.score && p.active);
  } else if (req.query.order == "EQ") {
    result = peopleList.find((p) => p.score == req.params.score && p.active);
  } else {
    result = peopleList.find((p) => p.score < req.params.score && p.active);
  }

  res.send(result);
});

router.get("/colors/:color", function (req, res, next) {
  res.send(
    peopleList
      .filter((p) => p.color.toLowerCase() == req.params.color.toLowerCase())
      .map((p) => p.id)
  );
});

router.get("/name/:name", function (req, res, next) {
  res.send(
    peopleList
      .filter((p) => p.first_name.startsWith(req.params.name))
      .map((p) => p.id)
  );
});

router.get("/active/score/:score", function (req, res, next) {
  let result;
  // lower than
  if (req.query.order.toUpperCase() == "LT") {
    result = peopleList
      .filter((p) => p.active && p.score < req.params.score)
      .map((p) => p.id);
  }
  // lower or equal
  else if (req.query.order.toUpperCase() == "LE") {
    result = peopleList
      .filter((p) => p.active && p.score <= req.params.score)
      .map((p) => p.id);
  }
  // equal
  else if (req.query.order.toUpperCase() == "EQ") {
    result = peopleList
      .filter((p) => p.active && p.score == req.params.score)
      .map((p) => p.id);
  }
  // greater or equal
  else if (req.query.order.toUpperCase() == "GE") {
    result = peopleList
      .filter((p) => p.active && p.score >= req.params.score)
      .map((p) => p.id);
  } else {
    // all other cases (greater than)
    result = peopleList
      .filter((p) => p.active && p.score > req.params.score)
      .map((p) => p.id);
  }

  res.send(result);
});

router.get("/pets", function (req, res, next) {
  let result;
  result = peopleList.filter((p) => p.pets != null && p.pets.length > 0);
  res.send(result.map((p) => p.id));
});

router.get("/pets/:type", function (req, res, next) {
  let result;

  result = peopleList.filter(
    (p) =>
      // important to check for null pets
      p.pets != null &&
      p.pets.find(
        (pet) => pet.animal.toLowerCase() == req.params.type.toLowerCase()
      ) != undefined
  );
  // short version:
  // result = peopleList.filter(p => p.pets && p.pets.find(pet => pet.animal.toLowerCase() == req.params.type.toLowerCase()));

  res.send(result.map((p) => p.id));
});

router.get("/map /", function (req, res, next) {
  let result;
  result = peopleList.map((pers) => ({
    id: pers.id,
    first_name: pers.first_name,
    las,
  }));
  res.send(result);
});

router.get("/map/active/scores/:score", function (req, res, next) {
  let result;
  result = peopleList.filter((p) => p.score > req.params.score && p.active);
  let resultMap = result.map((pers) => ({
    name: `${pers.first_name} ${pers.last_name}`,
    auto: `${pers.color} ${pers.car}`,
    domain: pers.email ? pers.email.substring(pers.email.indexOf("@") + 1) : "",
    wert: pers.score * 0.5,
    anzahl: pers.pets ? pers.pets.length : 0,
  }));

  res.send(resultMap);
});

router.get("/sumscore", function (req, res, next) {
  let sumScore = peopleList.reduce((sum, elm) => (sum += elm.score), 0);
  res.send("Summe: " + sumScore);
});

router.get("/sumscore/:color", function (req, res, next) {
  let result = peopleList.filter((pers) => pers.color == req.params.color);

  let sumScore = result.reduce((sum, elm) => (sum += elm.score), 0);
  res.send("Summe: " + sumScore);
});

module.exports = router;
