// src/app/pages/prescription-detail/prescription-detail.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MedicalPrescription } from '../../interfaces';
import { PrescriptionService } from '../../services/prescription.service';
import { catchError, of, switchMap } from 'rxjs';

const ROUTE_LABELS: Record<string, string> = {
  oral: 'Oral', sublingual: 'Sublingual', topical: 'Tópica',
  intravenous: 'Intravenosa', intramuscular: 'Intramuscular', other: 'Otra',
};

@Component({
  selector: 'app-prescription-detail',
  standalone: true,
  imports: [RouterLink, DatePipe, DecimalPipe],
  templateUrl: './prescription-detail.component.html',
  styleUrl: './prescription-detail.component.css',
})
export class PrescriptionDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private svc   = inject(PrescriptionService);

  rx      = signal<MedicalPrescription | null>(null);
  loading = signal(true);
  error   = signal<string | null>(null);

  routeLabel(r: string): string {
    return ROUTE_LABELS[r] ?? r;
  }

  sexLabel(s: string): string {
    const m: Record<string,string> = { M:'Masculino', F:'Femenino', O:'Otro', U:'No especificado' };
    return m[s] ?? s;
  }

  get totalTokens(): number {
    const r = this.rx();
    return (r?.input_tokens ?? 0) + (r?.output_tokens ?? 0);
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.svc.getById(id).pipe(
          catchError((err) => {
            this.error.set(`Error al cargar la receta: ${err?.status ?? 'Sin conexión'}`);
            this.loading.set(false);
            return of(null);
          })
        );
      })
    ).subscribe(data => {
      this.loading.set(false);
      if (data) {
        this.rx.set(data as MedicalPrescription);
      }
    });
  }
}
