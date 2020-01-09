var express = require("express");
var router = express.Router();
const VotesModels = require("../models/Votes");

router.get("/", (req, res, next) => {
  res.send("respond from votes");
});

router.post("/result", (req, res) => {
  res.send(req.body);
});

module.exports = router;
