import { Component } from '@angular/core';
import { Client } from '../../../models/client.model';
import { ClientService } from '../../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent {

  clients: Client[] = [];

  constructor(private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadClients();
  }

  private loadClients(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  deleteClient(id: string | undefined): void {
    if (id !== undefined)
      this.clientService.deleteClient(id).subscribe(() => {
        this.loadClients();
      });
  }

  navigateToAddClient(): void {
    this.router.navigate(['/clients/add']);
  }

  navigateToEditClient(id: string | undefined): void {
    if (id !== undefined)
      this.router.navigate(['/clients/edit', id]);
  }
}
