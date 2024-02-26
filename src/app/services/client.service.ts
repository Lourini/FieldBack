import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client,ZoneEtude,TypeOfConstruction } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
 // private baseUrl = 'http://localhost:3000/api';
  private baseUrl = 'http://185.166.39.250:3000/api'; // Adjust the base URL according to your API

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/clients`);
  }

  getClientById(id: string): Observable<any> {
    return this.http.get<Client>(`${this.baseUrl}/clients/${id}`);
  }

  createClient(client: Client,zoneEtude:ZoneEtude,typeOfConstructions : TypeOfConstruction[]): Observable<any> {
    const body = { "client": client,"zoneEtude": zoneEtude,"typeOfConstruction" : typeOfConstructions};
    return this.http.post<Client>(`${this.baseUrl}/clients`, body);
  }

  updateClient(id: string, client: Client,zoneEtude:ZoneEtude,typeOfConstructions : TypeOfConstruction[]): Observable<any> {
    const body = { "client": client,"zoneEtude": zoneEtude,"typeOfConstruction" : typeOfConstructions};
    return this.http.put<Client>(`${this.baseUrl}/clients/${id}`, body);
  }

  deleteClient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/clients/${id}`);
  }
}