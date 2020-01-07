var express = require('express');
var router = express.Router();
const UsersModel = require('../models/Users');

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
    // console.log({body});
    UsersModel.create(body).then(result => {
        // console.log({result})
        res.json(result)
    }).catch(err => {
        // console.log({err})
        res.json(err)
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
        .then((result = false) => {
            res.json(result);
        }).catch(err => {
        res.sendStatus(500);
    });
});

module.exports = router;
