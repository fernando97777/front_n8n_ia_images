import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgClass } from '@angular/common';
import { MedicalPrescriptionList } from '../../interfaces';
import { PrescriptionService } from '../../services/prescription.service';

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [RouterLink, FormsModule, DatePipe, NgClass],
  templateUrl: './prescriptions.component.html',
  styleUrl: './prescriptions.component.css',
})
export class PrescriptionsComponent implements OnInit {
  private svc = inject(PrescriptionService);

  all       = signal<MedicalPrescriptionList[]>([]);
  loading   = signal(true);
  search    = '';
  sexFilter = 'all';

  get filtered() {
    const q = this.search.toLowerCase();
    return this.all().filter(rx => {
      const matchQ = !q || [rx.patient_name, rx.clinic_name, rx.prescriber_name, rx.prescription_number]
        .some(f => f?.toLowerCase().includes(q));
      const matchSex = this.sexFilter === 'all' || rx.patient_sex === this.sexFilter;
      return matchQ && matchSex;
    });
  }

  sexLabel(sex: string): string {
    const m: Record<string,string> = { M:'Masculino', F:'Femenino', O:'Otro', U:'N/E' };
    return m[sex] ?? 'N/E';
  }

  sexVariant(sex: string): string {
    const m: Record<string,string> = { F:'danger', M:'info', O:'warning', U:'default' };
    return m[sex] ?? 'default';
  }

  ngOnInit(): void {
    this.svc.list({ ordering: '-prescription_date' }).subscribe({
      next:  data  => { this.all.set(data); this.loading.set(false); },
      error: ()    => this.loading.set(false),
    });
  }
}
