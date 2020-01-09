var express = require("express");
var router = express.Router();
const MessagesModel = require("../models/Messages");
const validators = require('../userInputValidators/validators')


router.get("/", (req, res, next) => {
  res.send("respond with a message");
});

router.post("/store", validators['messagesStoreValidatorArray'], validators['validatorfunction'], (req, res) => {
  let body = req.body;
  console.log({ body });

  let msg = body.messageContent;
  MessagesModel.create({
    messageContent: msg
  })
    .then(message => {
      res.json(msg);
    })
    .catch(err => {
      res.json(err);
    });
  res.send(msg);
});

module.exports = router;
