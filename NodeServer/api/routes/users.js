const express = require('express');
const mongoose=require('mongoose');
const router= express.Router();
const User = require('../models/user');
//const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken');
var CryptoJS = require("crypto-js");
///const Cryptr = require('cryptr');
const Crypto=require('crypto')
///const cryptr = new Cryptr('myTotalySecretKey');
const controller=require('../controller/controller')
const checkAuth=require('../middelware/check-auth');


router.post('/signup',(req,res,next)=>{
    
 User.find({email:req.body.email}).exec().then(result=>{

            if(result.length >= 1){
                res.status(200).json({message:'already exist'})
            }
            else{

                const user = new User({
                                _id : new mongoose.Types.ObjectId(),
                                email:req.body.email,
                               // password: password
                                    password:req.body.password
                                });
                                user.save().then(result=>{
                                    res.status(201).json({Message:'user created successfully',
                                    user:result.email,
                                    id:result._id
                                
                                });
                                }).catch(err=>{
                                    res.status(500).json({error:err});
                                });
            
            }

   }) 
   
   
    
});




router.delete('/:userId',(req,res,next)=>{

    const id=req.params.userId;
   

         User.deleteOne({_id:id})
         .exec()
         .then(result=>{
                         res.status(201).json({Message:'user deleted'});
          
             })
        .catch(
        err=>{
            res.status(500).json({error:err});
        }
     )


});


router.post('/login',(req,res,next)=>{

    User.findOne({email:req.body.email}).exec()
    .then((result)=>{
        function convertUserAESToPlain(){

        var bytes  = CryptoJS.AES.decrypt(req.body.password.toString(), req.body.email);
        var plaintext =bytes.toString(CryptoJS.enc.Utf8);
        console.log('pasword',plaintext)

       return plaintext

       }
      function convertDBAESToPlain(){

        var bytesDB = CryptoJS.AES.decrypt(result.password.toString(),result.email);
        var plaintextDB = bytesDB.toString(CryptoJS.enc.Utf8);
      
        console.log('pasword',plaintextDB);

       return plaintextDB
       }


       
       

     console.log('It is form DB',convertDBAESToPlain(),'   ----------', convertUserAESToPlain());
     function generateToken(pass,pass1){

        if(pass === pass1 )
        { 
            const token=    jwt.sign({
                email:result.email,
                userID:result._id
            },
            process.env.jwt_key,
            {
                expiresIn:"1h"
            });
            return res.status(200)
            .json({
                message:'Authentication Success...',
                Token:token,
                user:req.body.email,
            });
        }
        else{
            res.status(404).json({message:'Authentication Error'});
        }


     }generateToken( convertDBAESToPlain(),convertUserAESToPlain())
      
    })
    .catch( err=>{
            res.status(500).json({error:err});
        });

});


router.post('/forgetpassword',controller.forgertPassword)
router.post('/resetpassword',controller.resetPassword)


router.post('/',(req,res,next)=>{
    console.log('decrypting id' ,req.body.id)
   // const id = cryptr.decrypt(req.params.id)
   var decipher = Crypto.createDecipher('aes256', 'KEY');
var decrypted = decipher.update(req.body.id, 'hex', 'utf8') + decipher.final('utf8');
   // console.log(id);

    User.findById({_id:decrypted}).exec().then(result=>{
        res.status(201).json({result})
    }).catch(err=>{
        res.status(404).json({message:'Not Found user'})
    });
});
router.post('/auth',checkAuth,(req,res,next)=>{

    res.status(201).json({Message:'Success'})
});




module.exports = router;