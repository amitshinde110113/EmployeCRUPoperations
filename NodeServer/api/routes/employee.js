const express = require("express");
const mongoose = require('mongoose');
const Employee = require('../models/employees');
const router = express.Router();
const multer = require('multer');
const checkAuth=require('../middelware/check-auth');

var fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        console.log('in name change');
       
        cb(null,'./uploads/');
 
    },
    filename:function(req,file,cb){
        var extension = file.mimetype;
    extension = extension.substring(extension.indexOf("/")+1, extension.length);
    console.log('in name change'); 
    var filename = file.originalname + '-' + Date.now() + "." + extension;
    console.log('in name change',filename);
    cb(null, filename);
            }
});
const upload = multer({storage:storage});



router.get('/', checkAuth , (req, res, next) => {
    Employee.find().exec()
        .then(result => {
            res.status(200).json(
                result
            )

        }).catch(err => {
            res.status(404).json({
                error: err
            })
        });
});


router.get('/dash', (req, res, next) => {
    Employee.find().exec()
        .then(result => {
            res.status(200).json(
                result
            )

        }).catch(err => {
            res.status(404).json({
                error: err
            })
        });
});


router.get('/:id',checkAuth, (req, res, next) => {
    const id = req.params.id;
    Employee.findOne({_id:id}).exec()
        .then(result => {
            res.status(200).json(
                result
            )

        }).catch(err => {
            res.status(404).json({
                error: err
            })
        });
});








router.post('/create', upload.single('profiePic'),(req, res, next) => {

    employee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age?req.body.age:'',
        email: req.body.email,
        salary: req.body.salary?req.body.salary:'',
        gender:req.body.gender,
        
       hobbies:req.body.hobbies?req.body.hobbies:'',
       city:req.body.city?req.body.city:'',
       state:req.body.state?req.body.state:'',
       pin:req.body.pin?req.body.pin:'',
       education:req.body.education?req.body.education:'',
        contactNumber:req.body.contactNumber?req.body.contactNumber:'',
        address:req.body.address?req.body.address:'',
        skills:req.body.skills?req.body.skills:'',
       profiePic:(req.file?req.file.path:"uploads/default.jpg"),
          
    })
    console.log(req.file,employee);
    employee.save().then(result => {
       
        res.status(200).json(
            {
                Message: 'success employee created',
                data: employee
            })
        
    }

    ).catch(err => {
        res.status(404).json({
            error: err
        })
    })

});



router.patch('/update/:id',upload.single('profiePic'), (req, res, next) => {
    //console.log();
    
   console.log(req.body); 
   const id = req.params.id;
    const updateOps = {};
   updateOps['firstName']= req.body.firstName;
    updateOps['lastName']= req.body.lastName;
       updateOps['age']= req.body.age;
       updateOps['email']= req.body.email;
       updateOps['salary']= req.body.salary;
       updateOps['gender']=req.body.gender;
        
      updateOps['hobbies']=req.body.hobbies;
     updateOps['city']=req.body.city;
     updateOps['state']=req.body.state;
      updateOps['pin']=req.body.pin;
     updateOps['education']=req.body.education;
     updateOps['contactNumber']=req.body.contactNumber;
         updateOps['address']=req.body.address;
        updateOps['skills']=req.body.skills;
    if(req.file){
        updateOps['profiePic']=req.file.path;
        deleteOld=req.body.deleteOld;
        if(deleteOld !== 'uploads/default.jpg')
            {  fs.unlink(deleteOld,function (err) {
               if (err) throw err;
            // if no error, file has been deleted successfully
                console.log('File deleted!');
            });  }
       
       }
     
//    for (const op of req.body.data) {
//        updateOps[op.data.propName] = op.data.value;
//        console.log(op.propName,"-",op.value)
//    }
    Employee.update({ _id: id }, { $set: updateOps })
        .then(result => {
            res.status(200).json({
                data: result
            })
        }).catch(err => {
            res.status(404).json({
                error: err
            })
        })

});


router.delete('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    Employee.findOne({_id:id}).exec().then(result=>{
      console.log( result.profiePic)
      deleteOld=result.profiePic;
      if(deleteOld !== 'uploads/default.jpg')
          {  fs.unlink(deleteOld,function (err) {
             
          // if no error, file has been deleted successfully
              console.log('File deleted!');
          });  }

    }).catch(err => {
       
    })
    Employee.deleteOne({_id:id}).exec()
    .then(result=>{
        res.status(200).json(
            {
                Message: 'success'
            })
    }).catch(err => {
        res.status(404).json(
            {
            error: err
        })
    })
    
    
});




module.exports = router;