const express = require('express');
const UsersModel = require('../models/Users');
const multer = require('multer');
const Promise = require("bluebird");
const fs = require('fs');
const path = require('path');

var unlink = Promise.promisify(fs.unlink)

var upload = multer({
  dest: 'uploads/'
});
var router = express.Router();

//form tag in the front-end must have the following atrribute enctype="multipart/form-data"
//the input field in the front-end form must be type="file" name="gravetar"
//id must be sent along with the form as req.user_id
//will need testing the updating functionalities after the database is hooked up.

router.post('/', upload.single('gravetar'), function(req, res) {
  let uploadedFile = req.file;
  let oldUploadedFileName = uploadedFile.originalname;
  let fileNameAsWillBeInTheServer = uploadedFile.filename.toString();
  // let User_id = req.user_id;
  console.log(fileNameAsWillBeInTheServer)

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
    return;
  }

  let gravatar_ext = path.extname(oldUploadedFileName);
  let gravatar_id = fileNameAsWillBeInTheServer;
  let tempAvetarID

  if (!validGravetarExtensions[gravatar_ext]) {
    res.statusMessage = 'Invalid image format';
    return;
  }

  UsersModel.findOne({
      gravatar_id,
      gravatar_ext
    }, {
      where: {
        User_id
      }
    })
    .then((result) => {
      console.log({
        result
      });
      if (!result) {
        throw result
      }
      tempAvetarID = result
    })
    .then(() => {
      return UsersModel.update({
        gravatar_id,
        gravatar_ext
      }, {
        where: {
          User_id
        }
      })
    })
    .then((result) => {
      console.log({
        result
      });
      //perhaps should add the extension part
      return unlink(`uploads/${tempAvetarID}`)
    })
    .then((data) => {
      console.log({
        data
      })
    }).catch((err) => {
      console.log({
        err
      })
      // res.json(err)
    })

});

module.exports = router;
