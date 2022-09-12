import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    title: 'Clientes',
    loadChildren: () => import('./pages/customers/customers.module').then(m => m.CustomersPageModule)
  },
  {
    path: 'nuevo',
    title: 'Nuevo Cliente',
    loadChildren: () => import('./pages/customer-form/customer-form.module').then(m => m.CustomerFormPageModule)
  },
  {
    path: 'editar/:customerId',
    title: 'Editar Cliente',
    loadChildren: () => import('./pages/customer-form/customer-form.module').then(m => m.CustomerFormPageModule)
  },
  {
    path: 'ver/:customerId',
    title: 'Ver Cliente',
    loadChildren: () => import('./pages/customer-form/customer-form.module').then(m => m.CustomerFormPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
