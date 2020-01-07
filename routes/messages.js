var express = require("express");
var router = express.Router();
const MessagesModel = require("../models/Messages");

router.get("/", (req, res, next) => {
  res.send("respond with a message");
});

router.post("/", (req, res) => {
  let body = req.body;
  console.log({ body });

  MessagesModel.create(body)
    .then(message => {
      res.json(message);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
