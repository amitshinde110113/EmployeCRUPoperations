import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  id;userDatails
  hasPasswordErr=false;
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private toaster:ToastrService,private route:ActivatedRoute) { }
  user:FormGroup
    ngOnInit() {
  
  this.user=this.fb.group({
    password:['',[Validators.required]],
    confirmPassword:['',Validators.required],
    
  });
  this. id=this.route.snapshot.paramMap.get("id");
  this.authService.getById(this.id).subscribe((response:any)=>{
    this.userDatails=response.result;  
  });
}
    resetPassword(){

      let pwd=this.user.get('password').value 
      let pwd2=this.user.get('confirmPassword').value
      if(pwd===pwd2)
      {
        let key=this.userDatails.email;
        let data={
              id:this.userDatails._id,
              password: CryptoJS.AES.encrypt(pwd.trim(),key.trim()).toString(),
              email:this.userDatails.email
          }
        this.authService.resetPassword(data).subscribe(response=>{
            this.toaster.success('hey '+this.id+'Password changed successfully ');
            this.router.navigate(['auth/login']);
          })
      }   
      else{
        this.toaster.warning('Password does not match')
      }  
    }
  
    
}
