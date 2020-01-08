var express = require("express");
var router = express.Router();
const MessagesModel = require("../models/Messages");

router.get("/", (req, res, next) => {
    res.send("respond with a message");
});

router.post("/store", (req, res) => {
    let body = req.body;
    let msg = body.messageContent;

    MessagesModel.create({
        messageContent: msg
    }).then(message => {
        res.sendStatus(201);
    }).catch(err => {
        res.sendStatus(500);
    });
});

module.exports = router;
