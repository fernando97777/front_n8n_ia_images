// src/app/pages/analytics/analytics.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { ReportsService } from '../../services/reports.service';
import {
  DashboardStats,
  ChartDataPoint,
  TopMedication,
  TopDoctor,
  TopClinic,
  PatientDemographics,
  MedicationRoute,
} from '../../interfaces';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent implements OnInit {
  private dashSvc = inject(DashboardService);
  private reportsSvc = inject(ReportsService);

  loading = signal(true);
  stats = signal<DashboardStats | null>(null);
  prescriptionsByDate = signal<ChartDataPoint[]>([]);
  topMedications = signal<TopMedication[]>([]);
  topDoctors = signal<TopDoctor[]>([]);
  topClinics = signal<TopClinic[]>([]);
  demographics = signal<PatientDemographics | null>(null);
  medicationRoutes = signal<MedicationRoute[]>([]);

  get maxMedCount(): number {
    return Math.max(...this.topMedications().map(m => m.count), 1);
  }

  get maxDocCount(): number {
    return Math.max(...this.topDoctors().map(d => d.prescription_count), 1);
  }

  get maxClinicCount(): number {
    return Math.max(...this.topClinics().map(c => c.prescription_count), 1);
  }

  get maxRouteCount(): number {
    return Math.max(...this.medicationRoutes().map(r => r.count), 1);
  }

  get maxDateCount(): number {
    return Math.max(...this.prescriptionsByDate().map(d => d.count), 1);
  }

  sexLabel(sex: string): string {
    const m: Record<string, string> = { 'M': 'Masculino', 'F': 'Femenino', 'O': 'Otro', 'U': 'No especificado' };
    return m[sex] ?? sex;
  }

  routeLabel(route: string): string {
    const m: Record<string, string> = {
      'oral': 'Oral',
      'sublingual': 'Sublingual',
      'topical': 'Tópica',
      'intravenous': 'Intravenosa',
      'intramuscular': 'Intramuscular',
      'other': 'Otra',
    };
    return m[route] ?? route;
  }

  formatNumber(n: number): string {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'k';
    return String(n);
  }

  ngOnInit(): void {
    // Load all data in parallel
    this.dashSvc.getStats().subscribe(data => {
      this.stats.set(data);
      this.loading.set(false);
    });

    this.dashSvc.getPrescriptionsByDate(30).subscribe(data => {
      this.prescriptionsByDate.set(data);
    });

    this.dashSvc.getTopMedications(10).subscribe(data => {
      this.topMedications.set(data);
    });

    this.dashSvc.getTopDoctors(5).subscribe(data => {
      this.topDoctors.set(data);
    });

    this.dashSvc.getTopClinics(5).subscribe(data => {
      this.topClinics.set(data);
    });

    this.dashSvc.getPatientDemographics().subscribe(data => {
      this.demographics.set(data);
    });

    this.dashSvc.getMedicationRoutes().subscribe(data => {
      this.medicationRoutes.set(data);
    });
  }

  downloadPrescriptionsXlsx(): void {
    this.reportsSvc.downloadPrescriptionsXlsx();
  }

  downloadMedicationsXlsx(): void {
    this.reportsSvc.downloadMedicationsXlsx();
  }
}
