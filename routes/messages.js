var express = require("express");
var router = express.Router();
const MessagesModel = require("../models/Messages");
const validators = require('../userInputValidators/validators');
const io = require('../bin/www');

router.get("/", (req, res, next) => {
    res.send("respond with a message");
});

router.post("/store", validators['messagesStoreValidatorArray'], validators['validatorfunction'], (req, res) => {
    // Todo fix validation problem
    let {content, user_id, bubble_id} = req.body;

    MessagesModel.store(
        content,
        user_id,
        bubble_id
    ).then(message => {
        // Get the IO object and send message to all users in the bubble
        io.getIO().sockets.to(bubble_id).emit('message', message);
        res.sendStatus(201);
    }).catch(err => {
        console.log({err});
        res.sendStatus(500);
    });
});

module.exports = router;
