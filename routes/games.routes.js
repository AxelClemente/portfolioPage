// 1- Require 
const express = require('express');
const router = express.Router();

// 2- Routes 
router.get('/games',(req, res)=>{
        res.render("games") 
})



// 3- Export 
module.exports = router;


