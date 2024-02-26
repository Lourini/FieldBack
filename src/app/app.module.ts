import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEditUserComponent } from './components/user-management/add-edit-user/add-edit-user.component';
import { UserListComponent } from './components/user-management/user-list/user-list.component';
import { ClientListComponent } from './components/client-management/client-list/client-list.component';
import { AddEditClientComponent } from './components/client-management/add-edit-client/add-edit-client.component';
import { AddEditProjetComponent } from './components/projet-management/add-edit-projet/add-edit-projet.component';
import { ProjetListComponent } from './components/projet-management/projet-list/projet-list.component';
import { CodeStandardComponent } from './components/code-standard/code-standard.component';
import { LoginComponent } from './components/login/login.component';
import { TaskListComponent } from './components/tasks-management/task-list/task-list.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AuthGuard } from './components/login/auth.guard';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    AddEditUserComponent,
    ClientListComponent,
    AddEditClientComponent,
    AddEditProjetComponent,
    ProjetListComponent,
    CodeStandardComponent,
    LoginComponent,
    TaskListComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule
  ],
  providers: [AuthGuard,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
