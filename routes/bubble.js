var express = require('express');
var router = express.Router();
const sequelize = require("../models/index")

//to create a data base based on my schemas
sequelize
.sync()
.then(res => console.log(res)
.catch(err=>console.log(err)))

router.get("/",(req,res)=>{
    res.send("test")
})

module.exports = router;