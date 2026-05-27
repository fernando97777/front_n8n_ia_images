import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Clinica, PaginatedResponse } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ClinicService {
  private readonly base = `${environment.apiUrl}/clinicas/`;
  private http = inject(HttpClient);

  list(search?: string): Observable<Clinica[]> {
    let p = new HttpParams();
    if (search) p = p.set('search', search);
    return this.http.get<PaginatedResponse<Clinica>>(this.base, { params: p }).pipe(
      map(res => res.results)
    );
  }

  getById(id: number): Observable<Clinica> {
    return this.http.get<Clinica>(`${this.base}${id}/`);
  }
}
