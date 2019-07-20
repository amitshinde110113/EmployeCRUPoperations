import { Injectable } from '@angular/core';
import { FormGroup, FormArray, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  validationMessages
  constructor() { 

   this. validationMessages={

      firstName: {
        required:'First name required',
         minlength:'first name atleast 2 charaters',
       maxlength:'first name atmost 6 charaters'
    
      },
      lastName:{
        required:'last name required',
        minlength:'last name atleast 2 charaters',
        maxlength:'last name atmost 6 charaters'
    
      }, 
      email: {
        required:' Email is required',
        pattern:'Valid Email is required'
      },
   //  salary:{
    ///  required:'Salary is required'
    
    // }
     //,
  // orders:{required:'Atleast two required'},
    pin: {required:'Valid pin required',
         pattern:'Must 6 digits',
       
        },
    state:{required:'State is required'}, 
    city: {required:'City is required'},
    education: {required:'Qualification is required'},
   
    bdate: {required:'Birthdate is required'},
     address:{required:'Address is required'},
     contactNumber:{required:'Contact number is required',
                    pattern:'Valid number is required',
                  minLength:'must'},
   skills:{
     required:'Skills are required',
     minLength:'Please select atleast two'
    },


  }

  }
  
  formErrors={
    firstName:'',
    lastName:'',
    email:'',
   // salary:'',
   // orders:'',
    pin:'',
    state:'',
    city:'',
    education:'',
    bdate:'',
    address:'',
    contactNumber:'',
   skills:''
  }


  validatioErrors(group:FormGroup){
    Object.keys(group.controls).forEach((key: string) => {
       const abstractControl = group.get(key);
       this.formErrors[key]=" ";

       
            
        if (abstractControl instanceof FormArray) {

          
      
    } else{
    if(abstractControl.value == 'salary'){}
  ///  console.log("before",abstractControl.value,'--',abstractControl.valid)

        if(abstractControl && !abstractControl.valid &&(abstractControl.touched || abstractControl.dirty)){
          const messages=this.validationMessages[key];   
          
          for(const errKey in abstractControl.errors)
          { if(errKey)
            { 
              this.formErrors[key] = this.formErrors[key]+  messages[errKey]+ ' ';  
             this.formErrors[key]=this.formErrors[key].split('undefined')[0]
              
            }
          } 
          
        }
      }
    
  });
 
 }

 getFormErrors(){
  //console.log(this.formErrors)
  return this.formErrors
 }

 hobbiesError: Boolean = false;
 count = 0;
 onCheckBoxCheck(i,user) {
  this.hobbiesError = true;
    if (user.controls.orders.get(i.toString()).value) {
            this.count++;    
    }else{
      this.count--;
    }
       if(this.count!==1) {
      this.hobbiesError=false;
      user.get('orders').clearValidators()
         }
    if(this.count==1){
      user.get('orders').setValidators(Validators.requiredTrue)
    }
    user.get('orders').updateValueAndValidity();
}
}
