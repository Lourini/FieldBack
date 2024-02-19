import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmenagementsService {
  private apiUrl = 'http://185.166.39.250:3000/api'; // Replace with your API URL
  // private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  createAmenagementPropose(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AmenagementsProposes`, data);
  }

  getAmenagementsProposesByProjectId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/project/AmenagementsProposes/${id}`);
  }

  getAmenagementProposeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/AmenagementsProposes/${id}`);
  }

  updateAmenagementPropose(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/AmenagementsProposes/${id}`, data);
  }

  deleteAmenagementPropose(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/AmenagementsProposes/${id}`);
  }
}
