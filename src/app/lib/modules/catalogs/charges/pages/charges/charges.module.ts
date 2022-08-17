import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChargesPageRoutingModule } from './charges-routing.module';

import { ChargesPage } from './charges.page';
import { SharedModule } from 'src/app/lib/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChargesPageRoutingModule,
    SharedModule
  ],
  declarations: [ChargesPage]
})
export class ChargesPageModule { }
