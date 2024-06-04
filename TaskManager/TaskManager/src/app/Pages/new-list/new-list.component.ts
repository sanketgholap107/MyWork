import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { list } from 'src/app/modules/list.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit{
   constructor(private taskService:TaskService,private router:Router){}

   ngOnInit(): void {
       
   }

   createList(title:String){
    this.taskService.createList(title).subscribe((List:any)=>{
      console.log(List); 
      //now we navigate to/lists/response._id 
      this.router.navigate([`/lists`,List._id]);  
    });
   }
}
