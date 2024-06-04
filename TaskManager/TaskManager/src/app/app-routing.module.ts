import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from './Pages/task-view/task-view.component';
import { NewListComponent } from './Pages/new-list/new-list.component';
import { NewTaskComponent } from './Pages/new-task/new-task.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';

const routes: Routes = [
  {path : '' , redirectTo:'lists',pathMatch:'full'},
  {path :'new-list' , component:NewListComponent},
  {path :'login' , component:LoginPageComponent},
  {path:'lists' , component:TaskViewComponent},
  {path:'lists/:listid' , component:TaskViewComponent},
  {path :'lists/:listId/new-task' , component:NewTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
