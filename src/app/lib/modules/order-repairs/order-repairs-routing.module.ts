import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    title: 'Ordenes Reparación',
    loadChildren: () => import('./pages/order-repairs/order-repairs.module').then(m => m.OrderRepairsPageModule)
  },
  {
    path: 'nuevo',
    title: 'Nueva Order Reparación',
    loadChildren: () => import('./pages/order-repair-form/order-repair-form.module').then(m => m.OrderRepairFormPageModule)
  },
  {
    path: 'editar/:orderRepairId',
    title: 'Editar Order Reparación',
    loadChildren: () => import('./pages/order-repair-form/order-repair-form.module').then(m => m.OrderRepairFormPageModule)
  },
  {
    path: 'ver/:orderRepairId',
    title: 'Ver Order Reparación',
    loadChildren: () => import('./pages/order-repair-form/order-repair-form.module').then(m => m.OrderRepairFormPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRepairsRoutingModule { }
