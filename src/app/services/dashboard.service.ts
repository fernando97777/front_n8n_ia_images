import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DashboardStats,
  ChartDataPoint,
  TopMedication,
  TopDoctor,
  TopClinic,
  PatientDemographics,
  MedicationRoute,
} from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly base = `${environment.apiUrl}/dashboard`;
  private http = inject(HttpClient);

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.base}/stats/`);
  }

  getPrescriptionsByDate(days: number = 30): Observable<ChartDataPoint[]> {
    const params = new HttpParams().set('days', days.toString());
    return this.http.get<ChartDataPoint[]>(`${this.base}/prescriptions-by-date/`, { params });
  }

  getPrescriptionsByMonth(months: number = 12): Observable<ChartDataPoint[]> {
    const params = new HttpParams().set('months', months.toString());
    return this.http.get<ChartDataPoint[]>(`${this.base}/prescriptions-by-month/`, { params });
  }

  getTopMedications(limit: number = 10): Observable<TopMedication[]> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<TopMedication[]>(`${this.base}/top-medications/`, { params });
  }

  getTopDoctors(limit: number = 10): Observable<TopDoctor[]> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<TopDoctor[]>(`${this.base}/top-doctors/`, { params });
  }

  getTopClinics(limit: number = 10): Observable<TopClinic[]> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<TopClinic[]>(`${this.base}/top-clinics/`, { params });
  }

  getPatientDemographics(): Observable<PatientDemographics> {
    return this.http.get<PatientDemographics>(`${this.base}/patient-demographics/`);
  }

  getMedicationRoutes(): Observable<MedicationRoute[]> {
    return this.http.get<MedicationRoute[]>(`${this.base}/medication-routes/`);
  }
}
