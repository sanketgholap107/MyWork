import { Component , OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit{
  constructor(private taskService:TaskService,private route:ActivatedRoute){ }
  
  lists:any;
  tasks:any;

  selectedListId:any;
  ngOnInit(){
    this.route.params.subscribe(
      (params:Params)=>{
        if(params['listid']){
          this.selectedListId = params['listid'];
          this.taskService.getTasks(params['listid']).subscribe((tasks:any)=>{
            this.tasks = tasks;
          })
        }else{
          this .tasks = undefined;
        }
        
      });
     this.taskService.getList().subscribe((lists:any)=>{
        this.lists = lists;
            
     });
    }

    onTaskClick(task:any){
      //we want to set the task to be completed
      this.taskService.complete(task).subscribe(()=>{
         
        //the task has been set to completed successfully
        console.log("completed successfully");
        task.completed=!task.completed;
      });
    }

    onDeleteListClick(){
      this.taskService.deleteList(this.selectedListId).subscribe((res:any)=>{
        console.log(res);
        this.tasks = undefined; 
        this.taskService.getList().subscribe((lists:any)=>{
          this.lists = lists;    
       });
      })
    }
}

