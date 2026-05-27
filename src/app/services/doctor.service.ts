import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Doctor, PaginatedResponse } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private readonly base = `${environment.apiUrl}/doctors/`;
  private http = inject(HttpClient);

  list(search?: string): Observable<Doctor[]> {
    let p = new HttpParams();
    if (search) p = p.set('search', search);
    return this.http.get<PaginatedResponse<Doctor>>(this.base, { params: p }).pipe(
      map(res => res.results)
    );
  }

  getById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.base}${id}/`);
  }
}
