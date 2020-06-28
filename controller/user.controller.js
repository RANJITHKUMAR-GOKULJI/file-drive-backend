const userModel = require('../model/user.model');
const express = require('express');
const app = express();
function Auth(){

}

Auth.prototype.Login=(req,res)=>{
    console.log(req.body);
    const{userName,password} = req.body;
    userModel.findOne({userName,password}).then(doc=>{           
        res.json({doc});
        //app.use(express.static('./files/Admin'));     
    }).catch(err=>{
        res.json({err});
    })
}

Auth.prototype.Signup=(req,res)=>{
    console.log(req.body);
    const{userName,password} = req.body;
    userModel({userName,password}).save().then(doc=>{
        console.log({doc})
        res.json({doc});
    }).catch(err=>{
        res.json({err})
        console.log({err})
    })
}

module.exports = Auth;