import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService:WebRequestService) { }

  createList(title:String){
    //we want to send web request to create a list
   return this.webRequestService.post('createList',{title});
  }
  
  getList(){
    return this.webRequestService.get('showLists');
  }

  deleteList(id:String){
    return this.webRequestService.delete(`delete/${id}`);
  }

  getTasks(listId:String){
    return this.webRequestService.get(`CreateTask/${listId}/showTask`);
  }

  createTask(title:String, listId:String){
    //we want to send web request to create a task
   return this.webRequestService.post(`createList/${listId}/createTask`,{title});
  }

  complete(task:any){
    return this.webRequestService.patch(`createdList/${task._listid}/createdTask/${task._id}`,{
      completed:!task.completed
    });
  }
}
