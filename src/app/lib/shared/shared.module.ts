import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelLayoutComponent } from './layouts/panel-layout/panel-layout.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MainHeaderLayoutComponent } from './layouts/main-header-layout/main-header-layout.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    PanelLayoutComponent,
    MainHeaderLayoutComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    PanelLayoutComponent,
    MainHeaderLayoutComponent,
    BreadcrumbComponent
  ]
})
export class SharedModule { }
