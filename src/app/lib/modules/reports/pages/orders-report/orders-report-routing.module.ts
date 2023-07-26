import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersReportPage } from './orders-report.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersReportRoutingModule {}
