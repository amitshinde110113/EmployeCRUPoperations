import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpService } from 'src/app/shared/http.service';
import { Observable } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';
import { ValidatorService } from 'src/app/validator.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  updateElement:any; url:any="/assets/default-avatar-profile-icon-vector-18942381.jpg";
  ; user: FormGroup; data = [];
  educations = ['SSC', 'HSC', 'Gradutaion', 'Post Gradution']
  states = [
    { name: 'Gujarat', cities: ['surat', 'Ahmedabad', 'Anand', 'Dwarka', 'Gandhinagar', 'Jamnagar', 'Rajkot', 'Somnath'] }
    , { name: 'Maharashtra', cities: ['Pune', 'Mumbai', 'Nashik', 'Nagar'] }
  ];
  // hobbiesError: Boolean = false;
   count = 0;
imageselection=false;
  orders = [
    { id: 1, name: 'Singing', value: false },
    { id: 2, name: 'Reading', value: false },
    { id: 3, name: 'Dancing', value: false },
    { id: 4, name: 'Cooking', value: false }
  ];
  cities: Array<any>

  
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
  hobbies;//value: Observable<number>;
  constructor(private httpService: HttpService,private toster:ToastrService,private validaiteService:ValidatorService ,private fb: FormBuilder, private router: Router, private route: ActivatedRoute,private http:HttpClient) { }

  ngOnInit() {

    this.user = this.fb.group({
      firstName: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(6)]],
      lastName: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(6)]],
      email: ['', [Validators.required,Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$') ]],
      salary: ['',],// Validators.required,Validators.minLength(5)
      
      gender: ['Male'],
      orders: new FormArray([],),
      pin: ['', [Validators.required,Validators.pattern(/^[0-9]\d{5}$/)]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      education: ['', Validators.required],
      bdate: ['', Validators.required],
      profiePic:[''],
      address:['',Validators.required],
      contactNumber: ['',[Validators.required,Validators.pattern(/^[789]\d{9}$/) ]],//
      skills:[[],[Validators.required,Validators.minLength(2)]],//
  
    }); 


    this.user.valueChanges.subscribe(val=>{
   this.validaiteService.validatioErrors(this.user);
      this.formErrors= this.validaiteService.getFormErrors();
  
    })
    this.addCheckboxes();//adding checkboxes
    let id = this.route.snapshot.paramMap.get("id");
    this.getValuesForUpdate(id);

  }

  private addCheckboxes() {
    this.orders.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.user.controls.orders as FormArray).push(control);
    });
  }

  getValuesForUpdate(id) {
   this.httpService.getValuesForUpdate(id).subscribe(response => {
      this.updateElement = response;
      this.url=this.httpService.baseUrl+this.updateElement.profiePic;
     this.updateElement.hobbies.map((val,idx)=>{
       val==="true"?this.orders[idx].value=true:this.orders[idx].value=false;
       })
       
      for (let i = 0; i < this.updateElement.hobbies.length; i++) {
        this.user.controls.orders.get(i.toString()).setValue(this.orders[i].value);
        if(this.orders[i].value){
            this.count++;
           this.validaiteService.count++;
        }
      }
     
      this.displayValues();
     
    },(er)=>{
    //  this.router.navigate(['auth/login'])
    });


  }

  displayValues() {
        if( this.updateElement.state==''){ 
          this.user.patchValue({
            bdate: this.updateElement.age,
          });
           }
           else{
            this.onChangeState(this.updateElement.state)
            this.user.patchValue({
              bdate: new Date(this.updateElement.age),
              skills:JSON.parse(this.updateElement.skills),
            });
           }
    this.user.patchValue(
      {
        firstName: this.updateElement.firstName,
        lastName: this.updateElement.lastName,
        email: this.updateElement.email,
        salary: this.updateElement.salary,
        gender: this.updateElement.gender,
        pin: this.updateElement.pin,
        state: this.updateElement.state,
        city: this.updateElement.city,
        education: this.updateElement.education,
        address:this.updateElement.address,   
        contactNumber:this.updateElement.contactNumber
      });

    
  }
  onPrevious() {
    this.router.navigate(['../../list'],{relativeTo:this.route});
  }

  onUpdate() {

    const selectedOrderIds = this.user.value.orders
      .map((v, i) => v ? this.orders[i].name : null)

    ///console.log(selectedOrderIds);


  this.hobbies = this.orders;
    for (let i = 0; i < this.hobbies.length; i++) {
      this.hobbies[i].value = this.user.controls.orders.get(i.toString()).value;
    }
   
    let formData=new FormData();
    formData.append( 'firstName', this.user.get('firstName').value,);
    
    formData.append( 'lastName', this.user.get('lastName').value);
    formData.append( 'age', this.user.get('bdate').value);
    formData.append( 'email', this.user.get('email').value);
    formData.append( 'salary', this.user.get('salary').value);
    formData.append( 'gender', this.user.get('gender').value);
    formData.append( 'education', this.user.get('education').value);
    formData.append( 'city', this.user.get('city').value);
    formData.append( 'state', this.user.get('state').value);
    formData.append( 'pin', this.user.get('pin').value);
    formData.append( 'address', this.user.get('address').value);
    formData.append( 'contactNumber', this.user.get('contactNumber').value);

    if(this.imageselection){
       formData.append( 'profiePic', this.user.get('profiePic').value,(this.user.get('profiePic').value).name);
        formData.append('deleteOld',this.updateElement.profiePic)      
      }
   
  
 for (var i = 0; i < this.hobbies.length; i++) {
   formData.append('hobbies[]', this.hobbies[i].value);

   }
  let skills=this.user.get('skills').value
  formData.append( 'skills[]', JSON.stringify(skills));
            

                 

                    this.httpService.update(formData, this.updateElement._id).subscribe(response => {
                      this.router.navigate(['../../list'],{relativeTo:this.route});
                      this.toster.success('Succesfully updated ...!')
                    },err=>{
                      this.toster.error('Oops something went wrong!')
                    });
                
  }


  onChangeState(name) {
    this.user.patchValue({city:''})
    this.cities = this.states.find(resp => resp.name == name).cities;
  }

  bdateCalculate(e){
    let current= (new Date()).getFullYear()
    let birthYear=e.split('-')
    this.user.patchValue({age:(current-birthYear[0])}) 
   }


  
 
  //  onCheckBoxCheck(i) {
  //    this.hobbiesError = true;
  //  if (this.user.controls.orders.get(i.toString()).value) {
  //          this.count++;
       
  //  }else{this.count--;
  // }
 
  //  if(this.count>1) {
  //    this.hobbiesError=false;
  //  }
  //  }

   onFleLoad(event){
    if(event.target.files.length>0)
    { this.imageselection=true;
      const img=event.target.files[0];
      
      this.user.patchValue({profiePic:img})

      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
  
        reader.readAsDataURL(event.target.files[0]); // read file as data url
  
        reader.onload = (event) => { 
          // called once readAsDataURL is completed
         
          this.url = reader.result;
        }
      }
    }
   // console.log(this.user.get('profiePic').value)
  }


}
