import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelLayoutComponent } from './layouts/panel-layout/panel-layout.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PanelLayoutComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class SharedModule { }
