import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'lotes',
    loadComponent: () =>
      import('./pages/lotes/lotes.component').then((m) => m.LotesComponent),
  },
  {
    path: '',
    redirectTo: 'lotes',
    pathMatch: 'full',
  },
];
