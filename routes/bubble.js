const express = require('express');
const router = express.Router();
const BubbleModel = require('../models/Bubbles');

router.get("/", (req, res) => {
    res.send("test");
});

router.post("/create", (req, res) => {
    // Todo validation

    let {name} = req.body;
    BubbleModel.createBubble(name)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.sendStatus(500);
        });
});

// Generate temp Token for a bubble
router.post('/temp-token', function (req, res) {
    // Todo validation

    const {bubbleId} = req.body;
    BubbleModel.generateToken(bubbleId)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log({err});
            res.sendStatus(500);
        });
});

module.exports = router;