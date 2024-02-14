import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projet } from '../projet.model';
import { ProjetService } from '../projet.service';
import { UserService } from 'src/app/user-management/user.service';

@Component({
  selector: 'app-projet-list',
  templateUrl: './projet-list.component.html',
  styleUrls: ['./projet-list.component.scss']
})
export class ProjetListComponent implements OnInit {
  Projets: Projet[] = [];
  users: any[] = [];

  constructor(private router: Router, private projetService: ProjetService,private userService: UserService) {}

  ngOnInit() {
    this.loadProjets();
    this.loadUsers();
  }

  private loadProjets() {
    this.projetService.getProjets().subscribe(
      response => {
        this.Projets = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  private loadUsers() {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    })
  }
  formatUser(id: string | undefined): string | null | undefined {
    return this.users.find((e: any) => e.id === id)?.username;
  }

  onDelete(projetId: string | undefined) {
    if (confirm('Are you sure you want to delete this project?') && projetId!==undefined) {
      this.projetService.deleteProjet(projetId).subscribe(
        () => {
          // Remove the deleted project from the list
          this.loadProjets();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  navigateToAddprojet(): void {
    this.router.navigate(['/projects/add']);
  }

  navigateToEditProjet(id: string | undefined): void {
    if (id !== undefined)
      this.router.navigate(['/projects/edit', id]);
  }
}
