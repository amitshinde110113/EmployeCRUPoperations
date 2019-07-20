import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpInterceptor } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor{

  isLoggedIn=false;
  baseUrl= 'http://localhost:3000/users/';
  httpOptions = {
  headers: new HttpHeaders({
     'Content-Type': 'application/json'
       })
      }

  intercept(req,next){

    let tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'bearer ' + localStorage.getItem('token'))
      }
    )
    return next.handle(tokenizedReq)
  }
constructor(private http:HttpClient) { }


//------------New user SignUp request
signUp(data){
  return this.http.post<any>(this.baseUrl+'signup',data)
}

//------------New user SignIn request
sigIn(data){
  return this.http.post<any>(this.baseUrl+'login',data)
}

//------------ Forget password request
forgetPassword(data){

  return this.http.post(this.baseUrl+'forgetpassword',data)
}

//------------  password resetting data
resetPassword(data)
{
 return this.http.post(this.baseUrl+'resetpassword',data)
}

//------------ used to chek user is logged in or not in app-component.ts
isloggedIn()
{
  return this.isLoggedIn
}

//------------ used to set user logged in or not 
setLoginStatus(status:boolean)
{
this.isLoggedIn=status;
}

//------------ used to clear token from browser an logout user
logout(){
  this.setLoginStatus(false);
  localStorage.removeItem('token')
}

//---------------get the data of user who wants to recover password
getById(id){
  let data={id:id}
 return this.http.post(this.baseUrl,data)

}
}
