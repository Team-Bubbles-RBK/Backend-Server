const express = require('express');
const router = express.Router();
const BubbleModel = require('../models/Bubbles');
const UserModel = require('../models/Users');
const validators = require('../userInputValidators/validators');


router.get("/", (req, res) => {
    res.send("test")
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    BubbleModel.getBubbleInfo(id)
        .then(bubble => {
            res.json(bubble);
        })
        .catch(err => {
            res.sendStatus(500);
        });
});

router.post("/create", validators['bubbleCreateValidatorArray'], validators['validatorfunction'], (req, res) => {
    let {name} = req.body;

    BubbleModel.createBubble(name)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.sendStatus(500);
        });
});

/****
 * Generate temp Token for a bubble
 * @param bubbleId
 * @return the temp link hash
 */
router.post('/temp-token', function (req, res) {
    // Todo validation

    const {bubbleId} = req.body;
    BubbleModel.generateToken(bubbleId)
        .then(result => {
            res.send(result.temp_link);
        })
        .catch(err => {
            res.sendStatus(500);
        });
});

/***
 *  DELETE Method
 *  allows user to leave a bubble
 */
router.delete('/leave', function (req, res) {
    // Todo validation
    const {user_id, bubble_id} = req.body;

    UserModel.leaveBubble(user_id, bubble_id)
        .then(result => {
            console.log({result});
            res.status(200).send();
        })
        .catch(err => {
            res.sendStatus(500);
        });
});

router.post('/join', function (req, res) {
    // Todo validation
    const {user_id, bubble_id} = req.body;

    UserModel.joinBubble(user_id, bubble_id)
        .then(result => {
            res.status(200).send();
        })
        .catch(err => {
            res.sendStatus(500);
        });
});

module.exports = router;
