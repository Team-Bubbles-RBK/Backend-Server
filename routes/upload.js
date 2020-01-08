const express = require('express');
const UsersModel = require('../models/Users');
const multer = require('multer');
const Promise = require("bluebird");
const fs = require('fs');
const path = require('path');
const passport = require('passport');



var unlink = Promise.promisify(fs.unlink)

var upload = multer({
  dest: 'uploads/'
});
var router = express.Router();

//form tag in the front-end must have the following atrribute enctype="multipart/form-data"
//the input field in the front-end form must be type="file" name="gravetar"
//will need testing the updating functionalities after the database is hooked up.

router.post('/', passport.authenticate('jwt', {session: false}), upload.single('gravetar'), function(req, res) {
  let uploadedFile = req.file;
  let oldUploadedFileName = uploadedFile.originalname.toString();
  let fileNameAsWillBeInTheServer = uploadedFile.filename.toString();
  let id = req.user.id.toString();

  let validGravetarExtensions = {
    ".jpg": 1,
    ".jpeg": 1,
    ".png": 1
  }

  console.log("line 33", {
    uploadedFile,
    oldUploadedFileName,
    fileNameAsWillBeInTheServer
  })

  if (!uploadedFile) {
    res.statusMessage = 'Not found';
    res.status(500).end();
    return;
  }

  let gravatar_ext = path.extname(oldUploadedFileName.toLowerCase());
  let gravatar_id = fileNameAsWillBeInTheServer;
  let tempValue

  if (!validGravetarExtensions[gravatar_ext]) {
    res.statusMessage = 'Invalid image format';
    res.status(500).end();
    return;
  }

  UsersModel.findByPk(id)
    .then((userInstance) => {
      //console.log(userInstance);
      if (!userInstance) {
        throw userInstance
      }
      tempValue = userInstance
    })
    .then(() => {
      return UsersModel.update({
        gravatar_id,
        gravatar_ext
      }, {
        where: {
          id
        }
      })
    })
    .then((result) => {
      if (!result) {throw result};
      return unlink(`uploads/${tempValue[gravatar_id]}${tempValue[gravatar_ext]}`)
    })
    .catch((err) => {
      console.log({err})
      res.json(err)
    })
    .finally(() => {
      res.end()
    })

});




UsersModel.findOne({
    where: {
      first_name: "Ahmed"
    }
  }).then((data) => {
    console.log(data)
  })

module.exports = router;
