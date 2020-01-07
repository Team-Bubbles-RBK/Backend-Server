var express = require('express');
var router = express.Router();
const UsersModel = require('../models/Users');
const passport = require('passport');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
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

router.post('/sign-up', function (req, res) {
    let body = req.body;
    // Todo validation for input
    UsersModel.create(body).then(result => {
        // res.json(result)
        // Create a copy of created user info and then remove sensitive info
        let _resObj = JSON.parse(JSON.stringify(result));
        delete _resObj['hash'];
        delete _resObj['salt'];
        delete _resObj['id'];

        res.status(200).send(_resObj);
    }).catch(err => {
        // console.log({err})
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
router.post('/sign-in', function (req, res) {
    // Todo validation
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
    console.log({id: req.user.id}); // You can access the user id by doing that
    res.json('Success! You can now see this without a token.');
});

module.exports = router;
