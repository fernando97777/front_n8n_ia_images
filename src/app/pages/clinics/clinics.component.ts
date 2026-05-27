// src/app/pages/clinics/clinics.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Clinica } from '../../interfaces';
import { ClinicService } from '../../services/clinic.service';

@Component({
  selector: 'app-clinics',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './clinics.component.html',
  styleUrl: './clinics.component.css',
})
export class ClinicsComponent implements OnInit {
  private svc = inject(ClinicService);

  all     = signal<Clinica[]>([]);
  loading = signal(true);
  search  = '';

  get filtered() {
    const q = this.search.toLowerCase();
    return !q ? this.all() : this.all().filter(c =>
      [c.name, c.city, c.phone, c.email].some(f => f?.toLowerCase().includes(q))
    );
  }

  ngOnInit(): void {
    this.svc.list().subscribe(data => {
      this.all.set(data);
      this.loading.set(false);
    });
  }
}
