import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderRepairFormPageRoutingModule } from './order-repair-form-routing.module';

import { OrderRepairFormPage } from './order-repair-form.page';
import { SharedModule } from 'src/app/lib/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderRepairFormPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [OrderRepairFormPage]
})
export class OrderRepairFormPageModule { }
