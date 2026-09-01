// src/app/layout/layout.component.ts
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export const NAV_ITEMS = [
  { path: '/dashboard',    label: 'Dashboard',       icon: 'dashboard'    },
  { path: '/prescriptions',label: 'Recetas Médicas', icon: 'prescriptions'},
  { path: '/clinics',      label: 'Clínicas',        icon: 'clinics'      },
  { path: '/doctors',      label: 'Médicos',         icon: 'doctors'      },
  { path: '/patients',     label: 'Pacientes',       icon: 'patients'     },
  { path: '/analytics',    label: 'Analytics',       icon: 'analytics'    },
];

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  private auth = inject(AuthService);
  collapsed = signal(false);
  navItems  = NAV_ITEMS;

  toggleSidebar() { this.collapsed.update(v => !v); }
  logout()        { this.auth.logout(); }
}
