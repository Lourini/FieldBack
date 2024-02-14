import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DonneTrocons } from './donne-trocons.model';

@Injectable({
  providedIn: 'root'
})
export class DonnesTroconsService {

  private API = 'http://185.166.39.250:3000';

  constructor(private http: HttpClient) { }

  // Méthode pour créer un DonneTrocons
  createDonneTrocons(donneTrocons: DonneTrocons): Observable<any> {
    return this.http.post<any>(this.API+'/api/donneTrocons', donneTrocons);
  }

  // Méthode pour récupérer un DonneTrocons par son ID
  getDonneTroconsById(id: string): Observable<any> {
    return this.http.get<any>(this.API+`/api/donneTrocons/${id}`);
  }

  // Méthode pour mettre à jour un DonneTrocons
  updateDonneTrocons(id: string, donneTrocons: DonneTrocons): Observable<any> {
    return this.http.put<any>(this.API+`/api/donneTrocons/${id}`, donneTrocons);
  }

  // Méthode pour supprimer un DonneTrocons
  deleteDonneTrocons(id: string): Observable<any> {
    return this.http.delete<any>(this.API+`/api/donneTrocons/${id}`);
  }

  // Méthode pour récupérer les DonneTrocons par l'ID du projet
  getDonneTroconsByProjetId(id: string): Observable<any> {
    return this.http.get<any>(this.API+`/api/donneTrocons/projet/${id}`);
  }
}
