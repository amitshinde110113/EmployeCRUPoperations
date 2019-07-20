const mongoose=require('mongoose');

const resetPassword=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
     email:{type:String,
        required:true,
        unique:true,
        match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    token:{type:String}
});



module.exports=mongoose.model('ResetPassword',resetPassword);