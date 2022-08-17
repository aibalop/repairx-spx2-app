import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderRepairsPageRoutingModule } from './order-repairs-routing.module';

import { OrderRepairsPage } from './order-repairs.page';
import { SharedModule } from 'src/app/lib/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderRepairsPageRoutingModule,
    SharedModule
  ],
  declarations: [OrderRepairsPage]
})
export class OrderRepairsPageModule { }
