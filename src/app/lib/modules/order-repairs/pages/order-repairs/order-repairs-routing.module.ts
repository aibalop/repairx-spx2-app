import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderRepairsPage } from './order-repairs.page';

const routes: Routes = [
  {
    path: '',
    component: OrderRepairsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRepairsPageRoutingModule {}
