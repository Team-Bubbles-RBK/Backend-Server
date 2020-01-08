const {
  check,
  validationResult
} = require('express-validator');


//not connected the the routes


var userSignUpValidatorArray = [
  check('username').exists().trim().escape().isString().isEmail().normalizeEmail().withMessage('Invalid Email'),
  check('password').exists().trim().escape().isString().isLength({
    min: 8
  }).withMessage('Password must at least have 8 characters'),
  check('first_name').exists().trim().escape().isString().withMessage('First name must at least have 6 characters'),
  check('last_name').exists().trim().escape().isString().withMessage('Last name must at least have 6 characters'),
  check('hash').exists().trim().escape().isString().withMessage('Hash must be a string'),
  check('dob').exists().trim().escape().isString().withMessage('DOB must be a string'),
  check('gender').exists().trim().escape().isString().withMessage('gender must be a string')

];


var userSignInValidatorArray = [
  check('username').exists().trim().escape().isString().isEmail().normalizeEmail().withMessage('Invalid Email'),
  check('password').exists().trim().escape().isString().isLength({
    min: 8
  }).withMessage('Password must at least have 8 characters')
];

var messagesStoreValidatorArray = [
  check('messageContent').exists().trim().escape().withMessage('Message content must not be empty least'),
];


var bubbleCreateValidatorArray = [check('name').exists().trim().escape().isString().withMessage('Invalid Bubble name')];



var validatorfunction = (req, res) => {
  const errorsFound = validationResult(req);
  !errorsFound.isEmpty() ? (
    return res.status(422).json({
      errors: errorsFound.mapped()
    })) : (res.send({}););
};




module.exports.userSignUpValidatorArray = userSignUpValidatorArray;
module.exports.userSignInValidatorArray = userSignInValidatorArray;
module.exports.messagesStoreValidatorArray = messagesStoreValidatorArray;
module.exports.bubbleCreateValidatorArray = bubbleCreateValidatorArray;

module.exports.validatorfunction = validatorfunction;
