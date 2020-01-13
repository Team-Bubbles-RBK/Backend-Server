var express = require("express");
var router = express.Router();
const InvitationsModel = require("../models/Invitations");
const validators = require('../userInputValidators/validators');


router.get("/", (req, res, next) => {
    res.send("respond from invitations");
});

/**
 * Get result of Voting
 * Expects bubble_id as get parameter
 */
router.get('/voting/result/:id',validators['invitationVotingResultValidatorArray'], validators['validatorfunction'], (req, res) => {

    let invite_id = req.params.id;

    InvitationsModel.result(invite_id)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(_ => {
            res.statusCode(500);
        });
});

router.delete('/:id',validators['deleteInvitationsValidatorArray'], validators['validatorfunction'], (req, res) => {

    let id = req.params.id;

    InvitationsModel.remove(id)
        .then(result => {
            if (result) {
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        })
        .catch(err => {
            res.sendStatus(500);
        });
});

/**
 * If not exist generate an invitation for a user
 * @param bubble_id
 * @param invitee_id
 */

// This to be used when the user sign up or sign up following a invitation link
router.post("/generate", validators['generateInvitationsValidatorArray'], validators['validatorfunction'], (req, res) => {

    let {bubble_id, invitee_id} = req.body;

    InvitationsModel.generate(invitee_id, bubble_id)
        .then(result => {
            res.sendStatus(201);
        })
        .catch(err => {
            res.sendStatus(422);
        });
});


router.post('/vote', validators['invitationsVoteValidatorArray'], validators['validatorfunction'], function (req, res) {

    const {invitationId, voterId, vote} = req.body;

    InvitationsModel.vote(invitationId, voterId, vote)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.sendStatus(500);
        })
});
module.exports = router;
