import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { AddEditUserComponent } from './user-management/add-edit-user/add-edit-user.component';
import { ClientListComponent } from './client-management/client-list/client-list.component';
import { AddEditClientComponent } from './client-management/add-edit-client/add-edit-client.component';
import { AddEditProjetComponent } from './projet-management/add-edit-projet/add-edit-projet.component';
import { ProjetListComponent } from './projet-management/projet-list/projet-list.component';
import { CodeStandardComponent } from './code-standard/code-standard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
