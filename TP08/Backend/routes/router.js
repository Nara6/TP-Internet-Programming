const express = require('express');
const router = express.Router();
const userService = require('../services/user');

router.post('/register',(req,res)=>{
    const createUser = userService.register(req.body)
    res.json({
        "success": true,
        "Data" : createUser
    })
})
module.exports={
    router
}