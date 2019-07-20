import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  user: FormGroup
  constructor(private fb: FormBuilder, private authService: AuthService,private toaster:ToastrService) { }
  hasRestLink = false
  ngOnInit() {
    this.user = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]]
    })
  }
  checkUser() {
    let data = {
      email: this.user.get('email').value,
      path: 'http://localhost:4200/auth/resetpassword'
    }


    this.authService.forgetPassword(data).subscribe(response => {
      this.hasRestLink = true
      this.toaster.success('Password reset link sent to your mail')
    }, err => {
      this.toaster.success('Please enter valid Email address')

    })

   
  }
}
