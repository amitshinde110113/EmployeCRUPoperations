import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {

  constructor(private http:HttpService) { }
response:any
  ngOnInit() {
    
    this.http. loadDataDashboard().subscribe((result:any)=>{
       this.response=result;
    
    })

  }

}
