var express = require("express");
var router = express.Router();
const UsersModel = require('../models/Users');
const passport = require('passport');
const validators = require('../userInputValidators/validators');
const verifyToken = require('../lib/auth');

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

/**
 * POST Route
 * Sign up new user to the system.
 *  @param username : String
 *  @param password : String
 *  @param first_name : String
 *  @param last_name : String
 *  @param hash : String
 *  @param dob : String
 *  @param gender : String
 *  @param username : String
 */
// ,validators['userSignUpValidatorArray']
router.post('/sign-up', validators['userSignUpValidatorArray'], validators['validatorfunction'], function (req, res) {
    let body = req.body;

    UsersModel.create(body).then(result => {
        // Create a copy of created user info and then remove sensitive info
        let _resObj = JSON.parse(JSON.stringify(result));
        delete _resObj['hash'];
        delete _resObj['salt'];
        delete _resObj['id'];

        res.status(200).send(_resObj);
    }).catch(err => {
        res.sendStatus(400);
    });
});

/***
 *  Post Route
 *  Sign in user to the system.
 *  request body
 *  @param username : String
 *  @param password : String
 */
router.post('/sign-in', validators['userSignInValidatorArray'], validators['validatorfunction'], function (req, res) {

    let {username, password} = req.body;
    let doAuthenticate = UsersModel.authenticate(username, password);

    /***
     *  Check for the user in the database and compare
     *  entered the password to the stored hash
     */
    doAuthenticate
        .then((result) => {
            res.json(result);
        }).catch(err => {
        res.sendStatus(401);
    });
});

/***
 * Route for testing only
 * This is a protected route and can't be accessed unless
 * the user is authorized.
 * On all requests pass a Authorization header with
 * a value of `Bearer token_value`
 */
router.get('/protected', passport.authenticate('jwt', {session: false}), function (req, res) {
    // console.log({id: req.user.id}); // You can access the user id by doing that
    res.json('Success! You can now see this without a token.');
});

/**
 * Get the list of the bubbles
 * joined by a user joined
 */
router.get("/:id/bubbles", validators['userIdValidatorArray'], validators['validatorfunction'], function (req, res) {

    const user_id = req.params.id;

    UsersModel.getAllBubbles(user_id)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.sendStatus(422);
        });
});

/***
 * GET Route
 * Returns the user info (authenticated only)
 * Including array of invitations that has array of votes
 * and bubble information for each invitation
 */

// No validation is required here

router.get('/profile', passport.authenticate('jwt', {session: false}), function (req, res) {
    const id = req.user.id;

    UsersModel.getUserInfo(id)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(500).send();
        });
});

/***
 * Check if the provided token represent a
 * a user and its valid
 */
router.post('/check', function (req, res) {
    let {token} = req.body;

    verifyToken(token).then(result => {
        res.status(200).send(true);
    }).catch(err => {
        res.status(401).send(err);
    });
});

module.exports = router;
