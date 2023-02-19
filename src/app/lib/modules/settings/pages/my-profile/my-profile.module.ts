import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyProfilePageRoutingModule } from './my-profile-routing.module';

import { MyProfilePage } from './my-profile.page';
import { SharedModule } from 'src/app/lib/shared/shared.module';
import { ChangePasswordFormModalComponent } from '../../components/modals/change-password-form-modal/change-password-form-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    IonicModule,
    MyProfilePageRoutingModule
  ],
  declarations: [
    MyProfilePage,
    ChangePasswordFormModalComponent,
  ]
})
export class MyProfilePageModule { }
