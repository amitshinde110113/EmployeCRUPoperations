import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl= 'http://localhost:3000/';
  httpOptions = {
  headers: new HttpHeaders({
     'Content-Type': 'application/json',
     Authorization: 'bearer ' + localStorage.getItem('token')
 
  })
  
}
  constructor(private http:HttpClient) { }

  updateEement;searchString;

  //-------Loading data In list Component requires authorization
  loadData(){
    const url = this.baseUrl+'employees';
     return this.http.get(url,this.httpOptions);  
  }

  //--------Loading data in Dashboard
  loadDataDashboard(){
    const url = this.baseUrl+'employees/dash';
     return this.http.get(url,this.httpOptions);    
  }

 //-------delete data from list Component 
  delete(id){
    const url = this.baseUrl+'employees/delete/'
    return this.http.delete<any>(url +id);
  }

 //-------Loading data In update Component requires authorization
  getValuesForUpdate(id){
    const url = this.baseUrl+'employees/';
    return this.http.get(url+id,this.httpOptions);
}

 //-------Updating data from update Component requires authorization
  update(data,id){
    const url = this.baseUrl+'employees/update/';
    return  this.http.patch<any>(url + id, data)
}


 //-------create new employee from create Component requires authorization
create(data){
  let url = this.baseUrl+'employees/create';
  return this.http.post<any>(url,data)
}

 //-------user for the check token is present or not 
loggedIn(){
  return !!localStorage.getItem('token');
}

 //-------verify the token to check authorization
 checkAuth(){
 let httpOptionsAuth = {
    headers: new HttpHeaders({
       'Content-Type': 'application/json',
       Authorization: 'bearer ' + localStorage.getItem('token')
     })  
  }
  return this.http.post(this.baseUrl+'users/auth','',httpOptionsAuth)
}
}
