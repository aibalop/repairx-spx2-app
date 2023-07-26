import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ordenes',
    title: 'Reportes | Ordenes Reparación',
    loadChildren: () => import('./pages/orders-report/orders-report.module').then(m => m.OrdersReportModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
