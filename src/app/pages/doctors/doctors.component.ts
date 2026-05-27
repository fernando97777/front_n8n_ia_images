// src/app/pages/doctors/doctors.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Doctor } from '../../interfaces';
import { DoctorService } from '../../services/doctor.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent implements OnInit {
  private svc = inject(DoctorService);

  all     = signal<Doctor[]>([]);
  loading = signal(true);
  search  = '';

  get filtered() {
    const q = this.search.toLowerCase();
    return !q ? this.all() : this.all().filter(d =>
      [d.name, d.specialty, d.clinic_name ?? '', d.license_number]
        .some(f => f?.toLowerCase().includes(q))
    );
  }

  initials(name: string): string {
    return name.split(' ')
      .filter(w => /^[A-ZÁÉÍÓÚ]/.test(w))
      .slice(0, 2)
      .map(w => w[0])
      .join('');
  }

  specVariant(specialty: string): string {
    const m: Record<string, string> = {
      'Medicina General': 'success',
      'Cardiología':      'danger',
      'Pediatría':        'info',
      'Ginecología':      'warning',
    };
    return m[specialty] ?? 'default';
  }

  ngOnInit(): void {
    this.svc.list().subscribe(data => {
      this.all.set(data);
      this.loading.set(false);
    });
  }
}
