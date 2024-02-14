import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OuvragesHydrauliques,OuvragesHydrauliquesData } from './ouvrageshydrauliques.model';

@Injectable({
  providedIn: 'root'
})
export class OuvrageshydrauliquesService {
  private apiUrl = 'http://localhost:3000/api'; // Update with your API URL

  constructor(private http: HttpClient) { }

  createOuvragesHydrauliques(ouvrage: OuvragesHydrauliques): Observable<OuvragesHydrauliques> {
    return this.http.post<OuvragesHydrauliques>(`${this.apiUrl}/ouvragesHydrauliques`, ouvrage);
  }

  getOuvragesHydrauliquesByProjetId(projectId: string): Observable<OuvragesHydrauliquesData[]> {
    return this.http.get<OuvragesHydrauliquesData[]>(`${this.apiUrl}/projet/ouvragesHydrauliques/${projectId}`);
  }

  getOuvragesHydrauliquesById(id: string): Observable<OuvragesHydrauliques> {
    return this.http.get<OuvragesHydrauliques>(`${this.apiUrl}/ouvragesHydrauliques/${id}`);
  }

  updateOuvragesHydrauliques(id: string, ouvrage: OuvragesHydrauliques): Observable<OuvragesHydrauliques> {
    return this.http.put<OuvragesHydrauliques>(`${this.apiUrl}/ouvragesHydrauliques/${id}`, ouvrage);
  }

  deleteOuvragesHydrauliques(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/ouvragesHydrauliques/${id}`);
  }
}
