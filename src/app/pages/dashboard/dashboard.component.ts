// src/app/pages/dashboard/dashboard.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, SlicePipe } from '@angular/common';

import { MedicalPrescriptionList, Clinica, Doctor } from '../../interfaces';
import { PrescriptionService } from '../../services/prescription.service';
import { ClinicService } from '../../services/clinic.service';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, DatePipe, SlicePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private rxSvc      = inject(PrescriptionService);
  private clinicSvc  = inject(ClinicService);
  private doctorSvc  = inject(DoctorService);

  prescriptions = signal<MedicalPrescriptionList[]>([]);
  clinics       = signal<Clinica[]>([]);
  doctors       = signal<Doctor[]>([]);
  loading       = signal(true);

  get recent()     { return this.prescriptions().slice(0, 5); }
  get topDoctors() { return this.doctors().slice(0, 3); }
  get topClinics() { return this.clinics().slice(0, 3); }

  get totalTokens() {
    return this.prescriptions().reduce(
      (acc, rx) => acc + (rx.input_tokens ?? 0) + (rx.output_tokens ?? 0), 0
    );
  }

  formatTokens(n: number): string {
    return n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n);
  }

  maxRxCount(): number {
    return Math.max(...this.clinics().map(c => (c as any).prescriptions_count ?? 0), 1);
  }

  ngOnInit(): void {
    this.rxSvc.list({ ordering: '-created_at' }).subscribe(data => {
      this.prescriptions.set(data);
      this.loading.set(false);
    });
    this.clinicSvc.list().subscribe(data => this.clinics.set(data));
    this.doctorSvc.list().subscribe(data => this.doctors.set(data));
  }
}
