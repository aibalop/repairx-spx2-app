import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelLayoutComponent } from './layouts/panel-layout/panel-layout.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MainHeaderLayoutComponent } from './layouts/main-header-layout/main-header-layout.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { UserMenuPopoverComponent } from './components/popovers/user-menu-popover/user-menu-popover.component';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';
import { CrudActionsButtonComponent } from './components/crud-actions-button/crud-actions-button.component';
import { CrudActionsMenuPopoverComponent } from './components/popovers/crud-actions-menu-popover/crud-actions-menu-popover.component';
import { HeaderGenericFormModalComponent } from './components/header-generic-form-modal/header-generic-form-modal.component';
import { ConfirmCancelButtonsFormModalComponent } from './components/confirm-cancel-buttons-form-modal/confirm-cancel-buttons-form-modal.component';
import { NotFoundDataComponent } from './components/not-found-data/not-found-data.component';
import { ConfirmCancelButtonsFormComponent } from './components/confirm-cancel-buttons-form/confirm-cancel-buttons-form.component';
import {
    OrderRepairPaidStatusComponent
} from '../modules/order-repairs/components/order-repair-paid-status/order-repair-paid-status.component';
import {
    OrderRepairStatusComponent
} from '../modules/order-repairs/components/order-repair-status/order-repair-status.component';
import {
    OrderRepairDeviceStatusComponent
} from '../modules/order-repairs/components/order-repair-device-status/order-repair-device-status.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { CardSummaryComponent } from './components/card-summary/card-summary.component';
import { FilterDateSelectComponent } from './components/filter-date-select/filter-date-select.component';
import { OrderRepairFiltersComponent } from './components/order-repair-filters/order-repair-filters.component';

@NgModule({
    declarations: [
        PanelLayoutComponent,
        MainHeaderLayoutComponent,
        BreadcrumbComponent,
        UserMenuPopoverComponent,
        HeaderPageComponent,
        AddButtonComponent,
        SearchbarComponent,
        CrudActionsButtonComponent,
        CrudActionsMenuPopoverComponent,
        HeaderGenericFormModalComponent,
        ConfirmCancelButtonsFormModalComponent,
        NotFoundDataComponent,
        ConfirmCancelButtonsFormComponent,
        OrderRepairPaidStatusComponent,
        OrderRepairStatusComponent,
        OrderRepairDeviceStatusComponent,
        AvatarComponent,
        CardSummaryComponent,
        FilterDateSelectComponent,
        OrderRepairFiltersComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule
    ],
    exports: [
        PanelLayoutComponent,
        MainHeaderLayoutComponent,
        BreadcrumbComponent,
        UserMenuPopoverComponent,
        HeaderPageComponent,
        AddButtonComponent,
        SearchbarComponent,
        CrudActionsButtonComponent,
        CrudActionsMenuPopoverComponent,
        HeaderGenericFormModalComponent,
        ConfirmCancelButtonsFormModalComponent,
        NotFoundDataComponent,
        ConfirmCancelButtonsFormComponent,
        OrderRepairPaidStatusComponent,
        OrderRepairStatusComponent,
        OrderRepairDeviceStatusComponent,
        AvatarComponent,
        CardSummaryComponent,
        FilterDateSelectComponent,
        OrderRepairFiltersComponent,
    ]
})
export class SharedModule { }
