import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelLayoutComponent } from './layouts/panel-layout/panel-layout.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MainHeaderLayoutComponent } from './layouts/main-header-layout/main-header-layout.component';

@NgModule({
  declarations: [
    PanelLayoutComponent,
    MainHeaderLayoutComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    MainHeaderLayoutComponent
  ]
})
export class SharedModule { }
