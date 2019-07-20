const mongoose = require('mongoose');
const User = require('../models/user');
const ResetPassword=require('../models/resetPassword')
var nodemailer = require('nodemailer');
const jwt= require('jsonwebtoken');
//var CryptoJS = require("crypto-js");
//const Cryptr = require('cryptr');
//const cryptr = new Cryptr('myTotalySecretKey');
const Crypto=require('crypto')
//const User = require('../models/user');
//const bcrypt=require('bcrypt');
exports.forgertPassword=(req,res,next)=>{
      //  console.log('In forget password',req.body.path)
    User.find({email:req.body.email})
    .then(result=>{
       // console.log('email found')
        if(result.length<1)
        
        {   
            res.status(404).json({message:'Not Found'})
        }else{ 
          //  console.log('before mailing')

            mailer(result,req.body.path)
            console.log('before generation of token')
         function  createToken(){
                return token=   jwt.sign({
                    email:result.email,
                    userID:result._id
                },
                process.env.jwt_key,
                {
                    expiresIn:"1h"
                });
                
            }
            
           // console.log(token)
            new ResetPassword({
                _id: new mongoose.Types.ObjectId(),
                email:req.body.email,
                token:createToken()
            }).save().then(result=>{
                res.status(200)
                .json({
                    message:'Mail sent..Token will expire in 2 minute.',
                   // Token:token,
                    //user:req.body.email,
                   
                });
            }).catch(err=>{res.status(400).json({message:'error in token generation'})
            })
         
            //res.status(201).json({message:'success',result})
        }
    }).catch(err=>{
        res.status(401).json({message:'not found'})
    })
    
}

 function mailer(result,path)
{   const id=result[0]._id
    console.log(id)
    //const ID= CryptoJS.AES.encrypt((id.toString()),('KEY')).toString()
   //console.log(result[0]._id)
   //console.log(ID)
   var cipher = Crypto.createCipher('aes256', 'KEY');  
   var encrypted = cipher.update(id.toString(), 'utf8', 'hex') + cipher.final('hex');
    console.log(encrypted)
  //const ID= await CryptoJS.AES.encrypt((result[0]._id),('KEY')).toString()
  //const ID =  cryptr.encrypt(result[0]._id);
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'amitshinde110113@gmail.com',
    pass: '8975139966'
  },
  address:              'smtp.gmail.com',
  port:                 587,
});


var mailOptions = {
  from: 'amitshinde110113@gmail.com',
  to: result[0].email,
  subject: 'Password Reset',
  text: 'Reset Your password by following this link!'+path+'/'+encrypted
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
      console.log(process.env.MailPass)
    console.log(error);
  } else {
      
    console.log('Email sent: ' + info.response);
  }
});


}



exports.resetPassword=(req,res,next)=>{
    
    ResetPassword.find({email:req.body.email}).then(result=>{

        if(result.length<1)
        {
            res.status(404).json({message:'User Not Found'})
        }
        else{

            var tokanValidity=jwt.verify(result[0].token,process.env.jwt_key)
            if(tokanValidity)
            {   //var bytes  = CryptoJS.AES.decrypt(req.body.password.toString(), req.body.email);
               // var plaintext = bytes.toString(CryptoJS.enc.Utf8);
               // const password = cryptr.encrypt(plaintext);
              //  console.log(result[0],plaintext,password)
              password=req.body.password;
               User.updateOne({ email: result[0].email }, { $set: { password: password } }).then(response=>{
                    
                
                res.status(201).json({message:"success",response})
                console.log('response sent')
            ResetPassword.deleteOne({email:req.body.email}).then(saved=>{
                console.log(saved)
            }).catch()
                  
               })
            }
        }
    }).catch(err=>{
       res.status(404).json({
           message:'token expired'
   })
})
   
}