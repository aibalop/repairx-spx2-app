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

@NgModule({
    declarations: [
        CustomerFormShortModalComponent,
        SearchCustomerModalComponent,
        SearchWorkModalComponent,
        SearchChargeModalComponent
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
