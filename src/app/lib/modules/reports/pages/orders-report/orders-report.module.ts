import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersReportRoutingModule } from './orders-report-routing.module';

import { OrdersReportPage } from './orders-report.page';
import { SharedModule } from 'src/app/lib/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersReportRoutingModule,
    SharedModule,
  ],
  declarations: [
    OrdersReportPage,
  ]
})
export class OrdersReportModule { }
