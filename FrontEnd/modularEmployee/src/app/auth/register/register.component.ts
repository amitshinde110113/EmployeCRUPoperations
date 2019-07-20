import { Component, OnInit } from '@angular/core';
import { FormBuilder ,Validators,FormGroup} from '@angular/forms';
import { AuthService } from '../auth.service';
import * as CryptoJS from 'crypto-js';  
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private toaster:ToastrService) { }
user:FormGroup
  ngOnInit() {
   this. authService.logout()
this.user=this.fb.group({
  email:['',[Validators.required,Validators.pattern( '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]],
  password:['',Validators.required],

});
  }
registerUser(){
  let pwd=this.user.get('password').value 
      let data={
                email:this.user.get('email').value,
                password: CryptoJS.AES.encrypt(pwd.trim(),(this.user.get('email').value).trim()).toString()             
                }

      this.authService.signUp(data).subscribe(response=>{
         this.toaster.success('Successfully registered....');
         this.router.navigate(['auth/login'])
      },err=>{
        this.toaster.error('Ops..Registeratin failed');
      })

    }
}
