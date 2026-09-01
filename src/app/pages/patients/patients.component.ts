// src/app/pages/patients/patients.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PatientList } from '../../interfaces';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css',
})
export class PatientsComponent implements OnInit {
  private svc = inject(PatientService);

  all     = signal<PatientList[]>([]);
  loading = signal(true);
  search  = '';
  sexFilter = 'all';

  get filtered() {
    let result = this.all();
    const q = this.search.toLowerCase();

    if (q) {
      result = result.filter(p =>
        [p.name, p.phone, p.email].some(f => f?.toLowerCase().includes(q))
      );
    }

    if (this.sexFilter !== 'all') {
      result = result.filter(p => p.sex === this.sexFilter);
    }

    return result;
  }

  initials(name: string): string {
    return name.split(' ')
      .filter(w => /^[A-ZÁÉÍÓÚ]/i.test(w))
      .slice(0, 2)
      .map(w => w[0].toUpperCase())
      .join('');
  }

  sexLabel(sex: string): string {
    const m: Record<string, string> = {
      'M': 'Masculino',
      'F': 'Femenino',
      'O': 'Otro',
      'U': 'No especificado',
    };
    return m[sex] ?? sex;
  }

  sexVariant(sex: string): string {
    const m: Record<string, string> = {
      'M': 'info',
      'F': 'warning',
      'O': 'default',
      'U': 'default',
    };
    return m[sex] ?? 'default';
  }

  ngOnInit(): void {
    this.svc.list().subscribe(data => {
      this.all.set(data);
      this.loading.set(false);
    });
  }

  applyFilter(): void {
    this.loading.set(true);
    this.svc.list({ search: this.search, sex: this.sexFilter }).subscribe(data => {
      this.all.set(data);
      this.loading.set(false);
    });
  }
}
