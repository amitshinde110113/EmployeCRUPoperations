import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpService } from './shared/http.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private httpService:HttpService,private toaster:ToastrService,private modalService: BsModalService){ }
  title = 'modularEmployee';
  hide; modalRef: BsModalRef;

  user1:FormGroup
  skills=[]
  hobbies=['false','false','false','false']
  ngOnInit() {
      this.httpService.checkAuth().subscribe(response=>{
      this.authService.setLoginStatus(true);
  },err=>{
    this.authService.setLoginStatus(false);
  })
 
      this.user1=this.fb.group({
        lastName1:['',Validators.required],
        firstName1: ['',Validators.required],
        email1: ['',[Validators.required, Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]],
       gender1: ['Male'],
      });
  }

onSave(){
  let data= new FormData();
  data.append('firstName',this.user1.get('firstName1').value);
  data.append( 'lastName', this.user1.get('lastName1').value);
  data.append('email',this.user1.get('email1').value);
  data.append( 'gender', this.user1.get('gender1').value);
  this.httpService.create(data).subscribe(response=>{
    if(response)
    {
      this.toaster.success('Added Succeccfully...!');
      this.hide=true;
      this.modalRef.hide();   
    }
  });
}



openModal(exampleModalCenter: TemplateRef<any>) {
  this.httpService.checkAuth().subscribe(res=>{
    this.modalRef = this.modalService.show(exampleModalCenter);

  },err=>{
    this.router.navigate(['auth/login'])
  })


}

}
