import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { AddEditUserComponent } from './user-management/add-edit-user/add-edit-user.component';
import { ClientListComponent } from './client-management/client-list/client-list.component';
import { AddEditClientComponent } from './client-management/add-edit-client/add-edit-client.component';
import { ProjetListComponent } from './projet-management/projet-list/projet-list.component';
import { AddEditProjetComponent } from './projet-management/add-edit-projet/add-edit-projet.component';
import { CodeStandardComponent } from './code-standard/code-standard.component';
import { AuthGuard } from './login/auth.guard';
import { LoginComponent } from './login/login.component';

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
