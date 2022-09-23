import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderRepairFormPage } from './order-repair-form.page';

const routes: Routes = [
  {
    path: '',
    component: OrderRepairFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRepairFormPageRoutingModule {}
