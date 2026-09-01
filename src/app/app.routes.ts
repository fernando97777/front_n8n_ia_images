// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

const authGuard = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  if (auth.isAuthenticated()) return true;
  return router.createUrlTree(['/']);
};

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'prescriptions',
        loadComponent: () =>
          import('./pages/prescriptions/prescriptions.component').then(m => m.PrescriptionsComponent),
      },
      {
        path: 'prescriptions/:id',
        loadComponent: () =>
          import('./pages/prescription-detail/prescription-detail.component').then(m => m.PrescriptionDetailComponent),
      },
      {
        path: 'clinics',
        loadComponent: () =>
          import('./pages/clinics/clinics.component').then(m => m.ClinicsComponent),
      },
      {
        path: 'doctors',
        loadComponent: () =>
          import('./pages/doctors/doctors.component').then(m => m.DoctorsComponent),
      },
      {
        path: 'patients',
        loadComponent: () =>
          import('./pages/patients/patients.component').then(m => m.PatientsComponent),
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];
