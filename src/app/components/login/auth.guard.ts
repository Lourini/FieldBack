import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Check if the user is logged in
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // If not logged in, check for token existence and validity
    const jwtToken = this.cookieService.get('token');
    if (jwtToken) {
      const tokenExpiration = this.authService.getTokenExpiration(jwtToken);
      const now = Math.floor(Date.now() / 1000); // Current time in seconds

      if (tokenExpiration && tokenExpiration > now) {
        // Token is valid, mark the user as logged in
        this.authService.setLoggedIn(true);
        return true;
      }
    }

    // Redirect to login page if not logged in or token is expired
    this.router.navigate(['/login']);
    return false;
  }
}
