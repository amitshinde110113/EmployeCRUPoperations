import { FormGroup } from "@angular/forms";


import {AbstractControl} from '@angular/forms';

export function validateEmail(control : AbstractControl){

  if(control && (control.value !== null || control.value !== undefined)){
     const regex = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
     if (!regex.test(control.value)) {
      return {isError :  true }
    }
  }
  return null;
}

export function validatePassword(control : AbstractControl){

  if(control && (control.value !== null || control.value !== undefined)){
     const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
     if (!regex.test(control.value)) {
      return {isError :  true }
    }
  }
  return null;
}

export function validateName(control : AbstractControl){

  if(control && (control.value !== null || control.value !== undefined)){
    const regex = new RegExp(/^[a-zA-Z]{3,}/);
    if(! regex.test(control.value)){
      return {isError : true}
    }
  }
  return null;
}

export function validatAge(control : AbstractControl){
  if(control && (control.value !== null || control.value !== undefined)){
    const regex = new RegExp(/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/);
    if(! regex.test(control.value)){
      return {isError : true}
    }
  }
  return null;

}

export function validatSalary(control : AbstractControl){
  if(control && (control.value !== null || control.value !== undefined)){
    const regex = new RegExp(/^[0-9]+$/);
    if(! regex.test(control.value)){
      return {isError : true}
    }
  }
  return null;

}
export function validatDob(control : AbstractControl){
  if(control){
    if(control.value == null){
      return {isError : true};
    }
  }
  return null;
}
export function validatBrowse(control : AbstractControl){
  if(control){
    if(control.value == null){
      return {isError : true};
    }
  }
  return null;
}

export function validatPhoneNumber(control : AbstractControl){
  if(control && (control.value !== null || control.value !== undefined)){
    const regex = new RegExp(/^[789]\d{9}$/);
    if(! regex.test(control.value)){
      return {isError : true}
    }
  }
  return null;
}

export function validatPin(control: AbstractControl){
  if(control && (control.value !== null || control.value !== undefined)){
    const regex = new RegExp(/^[0-9]\d{5}$/);
    if(! regex.test(control.value)) {
      return {isError : true}
    }
  }
  return null;
}

export function validatSkills(control:AbstractControl){
  console.log(control);

  if(control && (control.value !== null || control.value !== undefined)){
    if(control.value.length == 1 ){
      return {isError : true}
    }

  }
  return null;
}

export function validatHobbies(control:AbstractControl){
  console.log(control);

  if(control && (control.value !== null || control.value !== undefined)){
    if(control.value.length == 1 ){
      return {isError : true}
    }

  }
  return null;
}

export function validateCheckBox(control : AbstractControl){

    console.log(control);

}





 var validationMessages={

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
   salary:{
    required:'Salary is required'
  
   },
   //orders:{required:'Atleast two required'},
    pin: {required:'Valid pin required'},
    state:{required:'State is required'}, 
    city: {required:'City is required'},
    education: {required:'Qualification is required'},
   
    bdate: {required:'Birthdate is required'},
     address:{required:'Address is required'},
   contactNumber:{required:'Contact number is required'},
   //skills:{
    //  required:'Skills are required',
     // minLength:'Please select atleast two'
    //},
  }
  
 var formErrors={
    firstName:'',
    lastName:'',
    email:'',
    salary:'',
    //orders:'',
    pin:'',
    state:'',
    city:'',
    education:'',
    bdate:'',
    address:'',
   contactNumber:'',
   //skills:''
  }
 export function validatioErrors(group:FormGroup){





    Object.keys(group.controls).forEach((key: string) => {
       const abstractControl = group.get(key);
       formErrors[key]=" ";

        if (abstractControl instanceof FormGroup) {
    
    } else {
        if(abstractControl && !abstractControl.valid &&(abstractControl.touched || abstractControl.dirty)){
          const messages=validationMessages[key];   
          for(const errKey in abstractControl.errors)
          { if(errKey)
            { console.log('In Validatior')
              formErrors[key] = formErrors[key]+  messages[errKey]+ ' ';   
            }
          } 
          
        }
    }
  });
 
 } 
 export function getFormErrors()
 {  
     return this.formErrors
 }

