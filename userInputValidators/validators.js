const {
  check,
  validationResult
} = require('express-validator');


var userSignUpValidatorArray = [
  check('username').exists({
    checkFalsy: true
  }).trim().escape().isString().isEmail().normalizeEmail().withMessage('Invalid Email'),
  check('hash').exists({
    checkFalsy: true
  }).trim().escape().isString().isLength({
    min: 8
  }).withMessage('Password must at least have 8 characters'),
  check('first_name').exists({
    checkFalsy: true
  }).trim().escape().isString().withMessage('Invalid First name'),
  check('last_name').exists({
    checkFalsy: true
  }).trim().escape().isString().withMessage('Invalid Last name'),
  check('dob').exists({
    checkFalsy: true
  }).trim().escape().isString().withMessage('DOB must be a string'),
  check('gender').exists({
    checkFalsy: true
  }).trim().escape().isString().withMessage('gender must be a string')
];


var userSignInValidatorArray = [
  check('username').exists({
    checkFalsy: true
  }).trim().escape().isString().isEmail().normalizeEmail().withMessage('Invalid Email'),
  check('password').exists({
    checkFalsy: true
  }).trim().escape().isString().isLength({
    min: 8
  }).withMessage('Password must at least have 8 characters')
];

var userIdValidatorArray =[check('user_id').exists({
  checkFalsy: true
}).trim().escape().isString().withMessage('Invalid User ID')]

var messagesStoreValidatorArray = [
  check('content').exists({
    checkFalsy: true
  }).trim().escape().withMessage('Message content must not be empty least'),
];


var bubbleCreateValidatorArray = [check('name').exists({
  checkFalsy: true
}).trim().escape().isString().withMessage('Invalid Bubble name')];


var bubbleIdValidatorArray = [check('bubbleId').exists({
  checkFalsy: true
}).trim().escape().isString().withMessage('Invalid Bubble ID')];


var bubbleLeaveValidatorArray =[check('user_id').exists({
  checkFalsy: true
}).trim().escape().isString().withMessage('Invalid User ID'), check('bubble_id').exists({
  checkFalsy: true
}).trim().escape().isString().withMessage('Invalid Bubble ID')];



var bubbleJoinValidatorArray =[check('user_id').exists({
  checkFalsy: true
}).trim().escape().isString().withMessage('Invalid User ID'), check('bubble_id').exists({
  checkFalsy: true
}).trim().escape().isString().withMessage('Invalid Bubble ID')];



var invitationsVoteValidatorArray = [check('invitationId').exists({
  checkFalsy: true
}).trim().escape().isString().withMessage('Invalid Invitation ID'), check('voterId').exists({
  checkFalsy: true
}).trim().escape().isString().withMessage('Invalid voter ID'),
check('vote').exists({
  checkFalsy: true
}).trim().escape().isBoolean().withMessage('Invalid Vote')]

var generateInvitationsValidatorArray = [check('bubble_id').exists({
  checkFalsy: true
}).trim().escape().isString().withMessage('Invalid Bubble ID'), check('invitee_id').exists({
  checkFalsy: true
}).trim().escape().isString().withMessage('Invalid Invitee ID')]


var deleteInvitationsValidatorArray = [check('id').exists({
  checkFalsy: true
}).trim().escape().isString().withMessage('Invalid Invitation ID')]


var invitationVotingResultValidatorArray = [check('id').exists({
  checkFalsy: true
}).trim().escape().isString().withMessage('Invalid Invitation ID')]


var validatorfunction = (req, res, next) => {
  const errorsFound = validationResult(req);
  !errorsFound.isEmpty() ? (res.status(422).json({
      errors: errorsFound.mapped()
    })) : (next());
};



module.exports.userSignUpValidatorArray = userSignUpValidatorArray;
module.exports.userSignInValidatorArray = userSignInValidatorArray;
module.exports.userIdValidatorArray = userIdValidatorArray;
module.exports.messagesStoreValidatorArray = messagesStoreValidatorArray;
module.exports.bubbleCreateValidatorArray = bubbleCreateValidatorArray;
module.exports.bubbleIdValidatorArray = bubbleIdValidatorArray;
module.exports.bubbleLeaveValidatorArray = bubbleLeaveValidatorArray;
module.exports.bubbleJoinValidatorArray = bubbleJoinValidatorArray;
module.exports.invitationsVoteValidatorArray = invitationsVoteValidatorArray;
module.exports.generateInvitationsValidatorArray = generateInvitationsValidatorArray;
module.exports.deleteInvitationsValidatorArray = deleteInvitationsValidatorArray;
module.exports.invitationVotingResultValidatorArray = invitationVotingResultValidatorArray;

module.exports.validatorfunction = validatorfunction;
