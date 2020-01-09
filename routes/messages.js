var express = require("express");
var router = express.Router();
const MessagesModel = require("../models/Messages");
const validators = require('../userInputValidators/validators');


router.get("/", (req, res, next) => {
    res.send("respond with a message");
});

router.post("/store", validators['messagesStoreValidatorArray'], validators['validatorfunction'], (req, res) => {
    let {content, user_id, bubble_id} = req.body;
    MessagesModel.store(
        content,
        user_id,
        bubble_id
    ).then(message => {
        res.sendStatus(201);
    }).catch(err => {
        res.sendStatus(500);
    });
});

module.exports = router;
