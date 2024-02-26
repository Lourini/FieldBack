import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projet } from '../../../models/projet.model';
import { ProjetService } from '../../../services/projet.service';
import { UserService } from '../../../services/user.service';
import { Client } from '../../../models/client.model';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-projet-list',
  templateUrl: './projet-list.component.html',
  styleUrls: ['./projet-list.component.scss']
})
export class ProjetListComponent implements OnInit {

  @Input() clientId = '';

  Projets: Projet[] = [];
  users: any[] = [];
  clients : Client[] = [];

  constructor(private router: Router, private projetService: ProjetService,private userService: UserService,
      private clientService : ClientService) {}

  ngOnInit() {
    if(this.clientId!=='' && this.clientId!==null && this.clientId!==undefined){
      this.loadProjetsByClients()
    }else{
      this.loadProjets();
    }
    this.loadUsers();
    this.loadClients();
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
  private loadProjetsByClients(){
    this.projetService.getProjetsByClientId(this.clientId).subscribe(
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
  private loadClients() {
    this.clientService.getClients().subscribe(resp=>{
      this.clients = resp;
    })
  }
  formatUser(id: string | undefined): string | null | undefined {
    return this.users.find((e: any) => e.id === id)?.username;
  }
  formatclient(id: string | undefined): string | null | undefined {
    return this.clients.find((e: any) => e.id === id)?.denomination;
  }

  onDelete(projetId: string | undefined) {
    if (confirm('Êtes-vous sûr(e) de vouloir supprimer ce projet ?') && projetId!==undefined) {
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
