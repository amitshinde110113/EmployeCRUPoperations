import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'forgetpassword',component:ForgetpasswordComponent},
  {path:'resetpassword/:id',component:ResetpasswordComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
