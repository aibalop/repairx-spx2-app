import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeDashboardPageRoutingModule } from './home-dashboard-routing.module';

import { HomeDashboardPage } from './home-dashboard.page';
import { SharedModule } from 'src/app/lib/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeDashboardPageRoutingModule,
    SharedModule
  ],
  declarations: [HomeDashboardPage]
})
export class HomeDashboardPageModule {}
