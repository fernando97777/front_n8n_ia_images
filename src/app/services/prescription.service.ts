import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MedicalPrescription, MedicalPrescriptionList, PaginatedResponse } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PrescriptionService {
  private readonly base = `${environment.apiUrl}/prescriptions/`;
  private http = inject(HttpClient);

  list(params?: { search?: string; patient_sex?: string; ordering?: string }): Observable<MedicalPrescriptionList[]> {
    let p = new HttpParams();
    if (params?.search)      p = p.set('search', params.search);
    if (params?.patient_sex && params.patient_sex !== 'all')
      p = p.set('patient_sex', params.patient_sex);
    if (params?.ordering)    p = p.set('ordering', params.ordering);
    return this.http.get<PaginatedResponse<MedicalPrescriptionList>>(this.base, { params: p }).pipe(
      map(res => res.results)
    );
  }

  getById(id: number): Observable<MedicalPrescription> {
    return this.http.get<MedicalPrescription>(`${this.base}${id}/`);
  }
}
