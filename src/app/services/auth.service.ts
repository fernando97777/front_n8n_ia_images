import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse {
  access:  string;
  refresh: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenUrl = `${environment.apiUrl}/auth/token/`;
  private http       = inject(HttpClient);
  private router     = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.tokenUrl, { username, password }).pipe(
      tap(res => {
        if (this.isBrowser) {
          localStorage.setItem('access_token',  res.access);
          localStorage.setItem('refresh_token', res.refresh);
        }
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.isBrowser ? !!localStorage.getItem('access_token') : false;
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('access_token') : null;
  }
}
