const express = require('express');
const router = express.Router();
const BubbleModel = require('../models/Bubbles');
const randomString = require("randomstring");
const crypto = require('crypto');

router.get("/", (req, res) => {
    res.send("test");
});

router.post("/create", (req, res) => {
    // Todo validation

    let {name} = req.body;
    let permHash = randomString.generate({
        length: 16,
        charset: name.toUpperCase()
    });
    let mykey = crypto.createCipher('aes-128-cbc', permHash);
    let mystr = mykey.update(permHash, 'utf8', 'hex');
    mystr += mykey.final('hex');

    BubbleModel.create({
        name: name,
        perm_link: mystr
    }).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.sendStatus(500);
    });
});

// Generate temp Token for a bubble
router.post('/:id/temp-token', function (req, res) {
    BubbleModel.generateToken()
});

module.exports = router;