import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Patient, PatientList, PaginatedResponse } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private readonly base = `${environment.apiUrl}/patients/`;
  private http = inject(HttpClient);

  list(params?: { search?: string; sex?: string }): Observable<PatientList[]> {
    let p = new HttpParams();
    if (params?.search) p = p.set('search', params.search);
    if (params?.sex && params.sex !== 'all') p = p.set('sex', params.sex);
    return this.http.get<PaginatedResponse<PatientList>>(this.base, { params: p }).pipe(
      map(res => res.results)
    );
  }

  getById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.base}${id}/`);
  }

  create(data: Partial<Patient>): Observable<Patient> {
    return this.http.post<Patient>(this.base, data);
  }

  update(id: number, data: Partial<Patient>): Observable<Patient> {
    return this.http.patch<Patient>(`${this.base}${id}/`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}${id}/`);
  }
}
