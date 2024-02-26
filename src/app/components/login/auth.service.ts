import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

 const API = 'http://localhost:3000/api/login';
// const API = 'http://185.166.39.250:3000/api/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
    if (this.cookieService.get('token')) {
      this.loggedIn = true;
    }
  }

  login(username: string, password: string): void {
    const body = { username, password };

    this.http.post(API, body).subscribe(
      (response: any) => {
        this.loggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        const expirationTime = new Date(Date.now() + 4 * 60 * 60 * 1000); // 4 hours in milliseconds
        const maxAge = Math.floor((expirationTime.getTime() - Date.now()) / 1000);
        this.cookieService.set('token', response.token, maxAge); // Expires in 4 hours
        this.router.navigate(['user-list']);
        document.body.style.backgroundColor = '#ffff';
      },
      error => {
        console.error(error);

        // Display an error message
      }
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('currentUser');
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }

  setLoggedIn(value: boolean): void {
    this.loggedIn = value;
  }

  getTokenExpiration(token: string): number | null {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      return decoded.exp; // Expiration time in seconds
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

}
