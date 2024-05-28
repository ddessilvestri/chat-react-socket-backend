const { response } = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/user');


const createUser = async(req,res = response)=>{
  try {
    const {email,password} = req.body;
    
    const existentEmail = await User.findOne({email});
    if(existentEmail){
        return res.status(400).json({
            ok:false,
            msg:'The email already exists'
        })
    }
    const user = new User(req.body);

    // encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password,salt);

    // Save passowrd in DB
    await user.save();


    res.json({
        user
    });



  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg:'Refer to the administrator'
    });
  }
}

const login = async(req,res)=>{

   
    const {email,password} =req.body;

    res.json({
        ok:true,
        msg:'login',
        email,
        password
    })
}


const renewToken = async(req,res)=>{
    res.json({
        ok:true,
        msg:'renew'
    })
} 

module.exports={
    createUser,
    login,
    renewToken
}