import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-management/user-list/user-list.component';
import { AddEditClientComponent } from './components/client-management/add-edit-client/add-edit-client.component';
import { AddEditUserComponent } from './components/user-management/add-edit-user/add-edit-user.component';
import { AuthGuard } from './components/login/auth.guard';
import { ClientListComponent } from './components/client-management/client-list/client-list.component';
import { ProjetListComponent } from './components/projet-management/projet-list/projet-list.component';
import { AddEditProjetComponent } from './components/projet-management/add-edit-projet/add-edit-projet.component';
import { CodeStandardComponent } from './components/code-standard/code-standard.component';
import { CalendarComponent } from './components/calendar/calendar.component';

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard]  },
  { path: 'add-user', component: AddEditUserComponent, canActivate: [AuthGuard]  },
  { path: 'edit-user/:id', component: AddEditUserComponent, canActivate: [AuthGuard]  },
  { path: 'clients', component: ClientListComponent, canActivate: [AuthGuard]  },
  { path: 'clients/add', component: AddEditClientComponent, canActivate: [AuthGuard]  },
  { path: 'clients/edit/:id', component: AddEditClientComponent, canActivate: [AuthGuard]  },
  { path: 'projects', component: ProjetListComponent, canActivate: [AuthGuard]  },
  { path: 'projects/add', component: AddEditProjetComponent, canActivate: [AuthGuard]  },
  { path: 'projects/edit/:id', component: AddEditProjetComponent, canActivate: [AuthGuard]  },
  { path: 'CodeStandard', component: CodeStandardComponent, canActivate: [AuthGuard]  },
  { path: 'Calendar/:id', component: CalendarComponent, canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
