import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { EOrderRepairsRoutes } from 'src/app/lib/core/enums/modules-routes.enum';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { ToastService } from 'src/app/lib/core/services/toast.service';
import { ICustomer } from '../../../customers/interfaces/customer.interface';
import { Customer } from '../../../customers/models/customer.model';
import { OrderRepairApiService } from '../../api/order-repair.api.service';
import { CustomerFormShortModalComponent } from '../../components/modals/customer-form-short-modal/customer-form-short-modal.component';
import { SearchCustomerModalComponent } from '../../components/modals/search-customer-modal/search-customer-modal.component';
import { IOrderRepair } from '../../interfaces/order-repair.interface';

@Component({
  selector: 'app-order-repair-form',
  templateUrl: './order-repair-form.page.html',
  styleUrls: ['./order-repair-form.page.scss'],
})
export class OrderRepairFormPage implements OnInit {

  titleHeader: string = 'Nueva Orden Reparación';

  isView: boolean = false;

  isEdit: boolean = false;

  orderRepairId: string;

  form = new FormGroup({
    customer: new FormControl(null, Validators.required),
  });

  customerSelected: Customer;

  isSend = false;

  subscription: Subscription;

  constructor(
    private _alertDialogService: AlertDialogService,
    private _toastService: ToastService,
    private _orderRepairApiService: OrderRepairApiService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _modalController: ModalController
  ) {

    this.isView = this._router.url.includes(EOrderRepairsRoutes.ORDER_REPAIRS_VIEW);

    this.isEdit = this._router.url.includes(EOrderRepairsRoutes.ORDER_REPAIRS_EDIT);

    this.titleHeader = this.isView ? 'Ver Orden Reparación' : this.titleHeader;

    this.titleHeader = this.isEdit ? 'Editar Orden Reparación' : this.titleHeader;

  }

  ngOnInit() {

    if (this.isEdit || this.isView) {

      this.subscription = this._activatedRoute.params.subscribe(params => {

        this.orderRepairId = params['orderRepairId'];

        if (this.orderRepairId) {
          this._getOrderRepair();
        } else {
          this._router.navigate([EOrderRepairsRoutes.ORDER_REPAIRS]);
        }

      });

    }

  }

  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }

  async onCreateCustomer(): Promise<void> {
    const formModal = await this._modalController.create({
      component: CustomerFormShortModalComponent,
      breakpoints: [0.25, 0.5, 0.75],
      initialBreakpoint: 0.75,
      backdropDismiss: false
    });

    await formModal.present();

    const { data } = await formModal.onDidDismiss();

    if (data) {
      this._setCustomer(data);
    }
  }

  async onSearchCustomer(): Promise<void> {
    const searchModal = await this._modalController.create({
      component: SearchCustomerModalComponent,
      breakpoints: [0.25, 0.5, 0.75, 1.0],
      initialBreakpoint: 1.0,
      backdropDismiss: false
    });

    await searchModal.present();

    const { data } = await searchModal.onDidDismiss();

    if (data) {
      this._setCustomer(data);
    }
  }

  private _setCustomer(data: ICustomer): void {
    this.form.patchValue({
      customer: {
        customerId: data._id,
        name: data.name,
        lastName: data.lastName,
        surName: data.surName ?? '',
        phone: data.phone,
        email: data.email ?? '',
      }
    });

    this.customerSelected = new Customer(data);
  }

  onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this._toastService.warning('Complete los campos obligatorios', 'Datos Incompletos');
      return;
    }

    this.isSend = true;

    if (this.isEdit) {
      this._update();
    } else {
      this._create();
    }

  }

  private async _getOrderRepair(): Promise<void> {

    try {
      const orderRepair = await this._orderRepairApiService.getById(this.orderRepairId).toPromise();
      // this.form.patchValue(orderRepair); // TODO uncommented
    } catch (error) {
      this._toastService.danger('No se pudo obtener los datos del cliente', 'Operación Fallida');
      this._alertDialogService.catchError(error);
      this._router.navigate([EOrderRepairsRoutes.ORDER_REPAIRS]);
    }

  }

  private async _create(): Promise<void> {

    try {
      await this._orderRepairApiService.create(this.form.value as IOrderRepair).toPromise();
      this._toastService.success('Orden creada correctamente', 'Operación Completada');
      this._router.navigate([EOrderRepairsRoutes.ORDER_REPAIRS]);
    } catch (error) {
      this.isSend = false;
      this._toastService.danger('No se pudo completar el registro', 'Operación Fallida');
      this._alertDialogService.catchError(error);
    }

  }

  private async _update(): Promise<void> {

    try {
      await this._orderRepairApiService.update(this.orderRepairId, this.form.value as IOrderRepair).toPromise();
      this._toastService.success('Orden actualizada correctamente', 'Operación Completada');
      this._router.navigate([EOrderRepairsRoutes.ORDER_REPAIRS]);
    } catch (error) {
      this.isSend = false;
      this._toastService.danger('No se pudo completar la actualización', 'Operación Fallida');
      this._alertDialogService.catchError(error);
    }

  }

}
