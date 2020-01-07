var express = require('express');
var router = express.Router();
const UsersModel = require('../models/Users');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/**
 * POST Route
 * Signup new user to the system.
 */

router.post('/sign-up', function (req, res) {
    let body = req.body;
    // Todo validation for input
    console.log({body});
    UsersModel.create(body).then(result => {
        // console.log({result})
        res.json(result)
    }).catch(err => {
        // console.log({err})
        res.json(err)
    });
});

module.exports = router;
