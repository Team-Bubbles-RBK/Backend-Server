const express = require('express');
const router = express.Router();
const BubbleModel = require('../models/Bubbles')
const TokensModel =require("../models/Tokens")
const sequelize = require("../models/index")
const randomstring = require("randomstring");
const crypto = require('crypto');
const moment = require('moment')




router.get("/",(req,res)=>{
    res.send("test")
})

router.post("/create",(req,res)=>{
    let data = req.body;
    let bubbleName = data.name;
    let permHash = randomstring.generate({
        length: 16,
        charset: data.name.toUpperCase()
      });
      let mykey = crypto.createCipher('aes-128-cbc', permHash);
      let mystr = mykey.update(permHash, 'utf8', 'hex')
      mystr += mykey.final('hex');



    BubbleModel.create({
        name : bubbleName,
        perm_link : mystr
    })
    TokensModel.create({
        temp_Link : permHash
    })
    //drop column when it pass 24 hour
    TokensModel.findAll({attributes: ["created_at"]}).then(function (res) {
        let dateNow = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        res.forEach(elm=>{
            let diffBetweenDate = moment.utc(moment(dateNow).diff(moment(elm.dataValues.created_at,"DD/MM/YYYY HH:mm:ss"))).format("HH")
            console.log(diffBetweenDate)
            if(diffBetweenDate === "24"){
                //for testing
                TokensModel.destroy({
                    where: {
                        created_at : elm.dataValues.created_at
                    }
                })
            }
        })  
      });
    
    
    res.send('bubble created')
})


module.exports = router;