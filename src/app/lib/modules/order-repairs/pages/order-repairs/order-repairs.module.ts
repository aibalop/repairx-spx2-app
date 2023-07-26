import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderRepairsPageRoutingModule } from './order-repairs-routing.module';

import { OrderRepairsPage } from './order-repairs.page';
import { SharedModule } from 'src/app/lib/shared/shared.module';
import {
  FilterOptionsOrderRepairPopoverComponent
} from '../../../../shared/components/popovers/filter-options-order-repair-popover/filter-options-order-repair-popover.component';

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
    FilterOptionsOrderRepairPopoverComponent,
  ]
})
export class OrderRepairsPageModule { }
