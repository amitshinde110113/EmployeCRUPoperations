import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  hobbies:any="";
  url="/assets/default-avatar-profile-icon-vector-18942381.jpg";
  constructor(private httpService:HttpService, private router:Router,private route:ActivatedRoute) { }
  data:any;isSelected=false;
  orders = [
    { id: 1, name: 'Singing', value: false },
    { id: 2, name: 'Reading', value: false },
    { id: 3, name: 'Dancing', value: false },
    { id: 4, name: 'Cooking', value: false }
  ];
  str;id={
    firstName:'',
    lastName:'',
    age:'',
   
  };
  ngOnInit() {

    this.httpService.loadData().subscribe((response: any) => {
              this.data=response;
            },(er)=>{
              this.router.navigate(['auth/login'])
            });
  
  }

   onDelete(id)
   {
        Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
                this.httpService.delete(id).subscribe(response=>{
                if(response!=null){
                     this.ngOnInit();
              }
            });
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
          }
        })

     }    
     
  
  
   onUpdate(element){
    this.router.navigate(['../update/',element._id],{relativeTo:this.route});
  }
   

 
   
   click(i){
    this.isSelected=false;}

   clicked(id){
    this.hobbies="";
    this.url=this.httpService.baseUrl+id.profiePic
     this.id=id;
     id.hobbies.map((ele,idx)=>{
          
     if(ele=='true'){
   this.hobbies+= ","+this.orders[idx].name
      }
    });
      this.isSelected=!this.isSelected;
   }

}
