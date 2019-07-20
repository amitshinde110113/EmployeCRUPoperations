import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
//var AES = require("crypto-js/aes");
//var CryptoJS = require("crypto-js");
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //const cryptr = new Cryptr('myTotalySecretKey');
  hasPasswordErr = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toaster: ToastrService) { }
  user: FormGroup
  ngOnInit() {
    localStorage.removeItem('token')
    this.user = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]],
      password: ['', Validators.required],

    });
  }

  loginUser() {

    let pwd = this.user.get('password').value
    let data = {
      email: this.user.get('email').value,
      password: CryptoJS.AES.encrypt(pwd.trim(), (this.user.get('email').value).trim()).toString()

    }
    console.log(data)
    this.authService.sigIn(data).subscribe(response => {
      this.toaster.success('Login successful');
      localStorage.setItem('token', response.Token)
      this.authService.setLoginStatus(true);
      this.router.navigate(['../employee'])
    }, (err) => {
      this.authService.setLoginStatus(false);
      this.hasPasswordErr = true
      this.toaster.error('Authentication Error');
    })

  }
  forgetPassword() {
    this.router.navigate(['auth/forgetpassword'])
    this.authService.setLoginStatus(false);
  }
}
