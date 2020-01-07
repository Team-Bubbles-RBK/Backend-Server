var express = require('express');
var router = express.Router();
const Bubble = require('../models/Bubbles')
const sequelize = require("../models/index")
var randomstring = require("randomstring");


//to create a data base based on my schemas
sequelize
.sync()
.then(res => console.log(res))


router.get("/",(req,res)=>{
    res.send("test")
})

router.post("/create",(req,res)=>{
    let data = req.body;
    let bubbleName = data.name;
    let permHash = randomstring.generate({
        length: data.name.length,
        charset: data.name
      });
    Bubble.create({
        name : bubbleName,
        perm_link : permHash
    })

    res.send('bubble created')
})


module.exports = router;