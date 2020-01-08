var express = require("express");
var router = express.Router();
const InvitationsModels = require("../models/Invitations");

router.get("/", (req, res, next) => {
  res.send("respond from invitations");
});

router.post("generate", (req, res) => {});

module.exports = router;
