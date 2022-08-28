import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChargesPageRoutingModule } from './charges-routing.module';

import { ChargesPage } from './charges.page';
import { SharedModule } from 'src/app/lib/shared/shared.module';
import { ChargeFormModalComponent } from '../../components/modals/charge-form-modal/charge-form-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChargesPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    ChargesPage,
    ChargeFormModalComponent
  ]
})
export class ChargesPageModule { }
