const express = require('express');
const UsersModel = require('../models/Users');
const multer = require('multer');
const Promise = require("bluebird");
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');



var rename = Promise.promisify(fs.rename);
var randomString = Promise.promisify(crypto.randomBytes)

var upload = multer({dest:'uploads/'});
var router = express.Router();

//form tag in the front-end must have the following atrribute enctype="multipart/form-data"
//the input field in the front-end form must be type="file" name="gravetar"

router.post('/gravetar', upload.single('gravetar'), function (req, res) {
  let uploadedFile = req.file;
  let oldUploadedFileName = uploadedFile.filename;
  let oldUploadedFilePath = uploadedFile.path;
  let validGravatarExtensions = {".jpg" : 1, ".jpeg" : 1, ".png" : 1}


  if (!uploadedFile || !oldUploadedFileName || !oldUploadedFilePath) {
    res.statusMessage = 'Not found';
    return;
  }

  let gravatar_ext = path.extname(oldUploadedFilePath);
  if (!validGravatarExtensions[fileExtension]) {
    res.statusMessage = 'Invalid image format';
    return;
  }

  let User_id = "id of the user --to be found in the cookies"
  let gravatar_id


  randomString(16).then((str) => {
    gravatar_id = str;
    return
  })
  .then(() => {
    return  UsersModel.update({gravatar_id, gravatar_ext}, { where: {User_id} })
  })
  .then((result) => {
    console.log({result});
    return rename(`${__dirname}/${oldUploadedFileName}${gravatar_ext}`, `${__dirname}/${gravatar_id}${gravatar_ext}`)
  })
  .then((data) => {
      console.log({data})
  }).catch((err) => {
    console.log({err})
    // res.json(err)
  })

});

module.exports = router;
