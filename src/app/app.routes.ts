import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'catalog' },
  { path: 'catalog', loadComponent: () => import('./features/catalog/catalog-list/catalog-list') },
  {
    path: 'catalog/:id',
    loadComponent: () => import('./features/catalog/catalog-detail/catalog-detail'),
  },
  {
    path: 'inventory',
    loadComponent: () => import('./features/inventory/inventory-owned/inventory-owned'),
  },
  { path: '**', redirectTo: 'catalog' },
];
