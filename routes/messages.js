var express = require("express");
var router = express.Router();
const Message = require("../models/Messages");
const sequelize = require("../models/index");

sequelize.sync().then(data => console.log(data));

router.get("/", (req, res, next) => {
  res.send("respond with a message");
});

router.post("/", (req, res) => {
  let body = req.body;
  console.log({ body });

  // let msg = body.messageContent;
  // Messages.create(msg)
  //   .then(message => {
  //     res.json(msg);
  //   })
  //   .catch(err => {
  //     res.json(err);
  //   });
  let msg = body.messageContent;
  Message.create({
    messageContent: msg
  });
  res.send(msg);
});

module.exports = router;
