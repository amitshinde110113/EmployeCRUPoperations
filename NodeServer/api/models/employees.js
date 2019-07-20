const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String  },
    age: { type: String },
    salary: { type: Number },
    gender:{type:String},
    email: {
        type: String,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
   hobbies:{type:Array},
   education:{type:String},
   city:{type:String},
   state:{type:String},
   pin:{type:String},
   profiePic:{type:String},
    contactNumber:{type:Number},
    address:{type:String},
    skills:{type:Array}
});


module.exports=mongoose.model('Employee',employeeSchema);