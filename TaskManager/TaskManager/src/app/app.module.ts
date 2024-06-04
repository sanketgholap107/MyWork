import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './Pages/task-view/task-view.component';
import { HttpClientModule } from '@angular/common/http';
import { NewListComponent } from './Pages/new-list/new-list.component';
import { NewTaskComponent } from './Pages/new-task/new-task.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewListComponent,
    NewTaskComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
