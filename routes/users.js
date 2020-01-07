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
  res.json("")
  // UsersModel.create({})
});

module.exports = router;
