import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReportsService {
  private readonly base = `${environment.apiUrl}/reports`;
  private http = inject(HttpClient);

  downloadPrescriptionPdf(id: number): void {
    const url = `${this.base}/prescription/${id}/pdf/`;
    window.open(url, '_blank');
  }

  downloadPrescriptionsXlsx(params?: {
    from_date?: string;
    to_date?: string;
    clinic?: number;
    doctor?: number;
  }): void {
    let p = new HttpParams();
    if (params?.from_date) p = p.set('from_date', params.from_date);
    if (params?.to_date) p = p.set('to_date', params.to_date);
    if (params?.clinic) p = p.set('clinic', params.clinic.toString());
    if (params?.doctor) p = p.set('doctor', params.doctor.toString());

    const url = `${this.base}/prescriptions/xlsx/?${p.toString()}`;
    window.open(url, '_blank');
  }

  downloadMedicationsXlsx(): void {
    const url = `${this.base}/medications/xlsx/`;
    window.open(url, '_blank');
  }
}
