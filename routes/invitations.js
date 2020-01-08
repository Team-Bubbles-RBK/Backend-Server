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
router.get('/voting/:id', (req, res) => {
    // Todo validation
    let invite_id = req.params.id;

    InvitationsModels.result(invite_id)
        .then(result => {
            res.status(200).send(result);
        }).catch(_ => {
        res.statusCode(500);
    });
});

router.post("generate", (req, res) => {
});

module.exports = router;
