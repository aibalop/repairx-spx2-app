import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorksPageRoutingModule } from './works-routing.module';

import { WorksPage } from './works.page';
import { SharedModule } from 'src/app/lib/shared/shared.module';
import { WorkFormModalComponent } from '../../components/modals/work-form-modal/work-form-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorksPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    WorksPage,
    WorkFormModalComponent
  ]
})
export class WorksPageModule { }
