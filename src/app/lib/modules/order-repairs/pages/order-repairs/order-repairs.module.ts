import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderRepairsPageRoutingModule } from './order-repairs-routing.module';

import { OrderRepairsPage } from './order-repairs.page';
import { SharedModule } from 'src/app/lib/shared/shared.module';
import {OrderRepairFiltersComponent} from '../../components/order-repair-filters/order-repair-filters.component';
import {
  FilterOptionsOrderRepairPopoverComponent
} from '../../components/popovers/filter-options-order-repair-popover/filter-options-order-repair-popover.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        OrderRepairsPageRoutingModule,
        SharedModule,
    ],
  declarations: [
    OrderRepairsPage,
    OrderRepairFiltersComponent,
    FilterOptionsOrderRepairPopoverComponent,
  ]
})
export class OrderRepairsPageModule { }
