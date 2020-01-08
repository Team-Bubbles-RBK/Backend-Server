var express = require("express");
var router = express.Router();
const InvitationsModels = require("../models/Invitations");

router.get("/", (req, res, next) => {
    res.send("respond from invitations");
});

/**
 * Get result of Voting
 * Expects bubble_id as get parameter
 */
router.get('/voting/result/:id', (req, res) => {
    let invite_id = req.params.id;

    InvitationsModels.result(invite_id)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(_ => {
            res.statusCode(500);
        });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;

    InvitationsModels.remove(id)
        .then(result => {
            console.log({result})
            if (result) {
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.post("generate", (req, res) => {
});

module.exports = router;
