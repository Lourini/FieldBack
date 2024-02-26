import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CodeStandard } from '../models/codestandard.model';

@Injectable({
  providedIn: 'root'
})
export class CodeStandardService {
  //private apiUrl = 'http://localhost:3000/api';
   private apiUrl = 'http://185.166.39.250:3000/api'; // Update with your API URL

  constructor(private http: HttpClient) { }

  createCodeStandard(codeStandard: CodeStandard): Observable<CodeStandard> {
    return this.http.post<CodeStandard>(`${this.apiUrl}/CodeStandard`, codeStandard);
  }

  getAllCodeStandards(): Observable<CodeStandard[]> {
    return this.http.get<CodeStandard[]>(`${this.apiUrl}/CodeStandard`);
  }

  getCodeStandardById(id: string): Observable<CodeStandard> {
    return this.http.get<CodeStandard>(`${this.apiUrl}/CodeStandard/${id}`);
  }

  getCodeStandardByType(type: string): Observable<CodeStandard[]> {
    return this.http.get<CodeStandard[]>(`${this.apiUrl}/CodeStandard/type/${type}`);
  }

  updateCodeStandard(id: string, codeStandard: CodeStandard): Observable<CodeStandard> {
    return this.http.put<CodeStandard>(`${this.apiUrl}/CodeStandard/${id}`, codeStandard);
  }

  deleteCodeStandard(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/CodeStandard/${id}`);
  }
}
