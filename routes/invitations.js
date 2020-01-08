var express = require("express");
var router = express.Router();
const InvitationsModels = require("../models/Invitations");

router.get("/", (req, res, next) => {
    res.send("respond from invitations");
});

// Get result of Voting
router.get('/voting/:id', (req, res) => {
  let invite_id = req.params.id;
  InvitationsModels.result(invite_id);
      // .then()
  res.json(invite_id);
});

router.post("generate", (req, res) => {
});

module.exports = router;
