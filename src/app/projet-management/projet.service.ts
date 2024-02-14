// projet.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from './projet.model'; // assuming Projet model exists

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private baseUrl = 'http://185.166.39.250:3000/api'; // Your Node.js server address

  constructor(private http: HttpClient) { }

  createProjet(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(`${this.baseUrl}/projets`, projet);
  }

  getProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.baseUrl}/projets`);
  }

  getProjetById(id: string): Observable<Projet> {
    return this.http.get<Projet>(`${this.baseUrl}/projets/${id}`);
  }

  updateProjet(id: string, projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.baseUrl}/projets/${id}`, projet);
  }

  deleteProjet(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/projets/${id}`);
  }

  getProjetsByClientId(clientId: string): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.baseUrl}/projets/client/${clientId}`);
  }
}
