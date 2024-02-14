import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anomalie } from './anomalie.model';

@Injectable({
  providedIn: 'root'
})
export class AnomalieService {
  private apiUrl = 'http://185.166.39.250:3000/api'; // Update with your API URL

  constructor(private http: HttpClient) { }

  createAnomalie(anomalie: Anomalie): Observable<Anomalie> {
    return this.http.post<Anomalie>(`${this.apiUrl}/anomalies`, anomalie);
  }

  getAnomaliesByProjetId(projectId: string): Observable<Anomalie[]> {
    return this.http.get<Anomalie[]>(`${this.apiUrl}/projet/anomalies/${projectId}`);
  }

  getAnomalieById(id: string): Observable<Anomalie> {
    return this.http.get<Anomalie>(`${this.apiUrl}/anomalies/${id}`);
  }

  updateAnomalie(id: string, anomalie: Anomalie): Observable<Anomalie> {
    return this.http.put<Anomalie>(`${this.apiUrl}/anomalies/${id}`, anomalie);
  }

  deleteAnomalie(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/anomalies/${id}`);
  }
}
