import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRepairsRoutingModule } from './order-repairs-routing.module';
import { CustomerFormShortModalComponent } from './components/modals/customer-form-short-modal/customer-form-short-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { SearchCustomerModalComponent } from './components/modals/search-customer-modal/search-customer-modal.component';
import { SearchWorkModalComponent } from './components/modals/search-work-modal/search-work-modal.component';
import { SearchChargeModalComponent } from './components/modals/search-charge-modal/search-charge-modal.component';
import { DeviceFormModalComponent } from './components/modals/device-form-modal/device-form-modal.component';
import { CompleteOrderRepairModalComponent } from './components/modals/complete-order-repair-modal/complete-order-repair-modal.component';
import { OrderRepairFiltersComponent } from './components/order-repair-filters/order-repair-filters.component';

@NgModule({
    declarations: [
        CustomerFormShortModalComponent,
        SearchCustomerModalComponent,
        SearchWorkModalComponent,
        SearchChargeModalComponent,
        CompleteOrderRepairModalComponent,
        DeviceFormModalComponent,
        OrderRepairFiltersComponent,
    ],
    imports: [
        CommonModule,
        OrderRepairsRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        IonicModule,
        FormsModule
    ],
    exports: [],
    providers: [],
})
export class OrderRepairsModule { }
