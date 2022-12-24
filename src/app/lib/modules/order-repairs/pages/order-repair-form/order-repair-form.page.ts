import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { EOrderRepairsRoutes } from 'src/app/lib/core/enums/modules-routes.enum';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { ToastService } from 'src/app/lib/core/services/toast.service';
import { Consts } from 'src/app/lib/core/utils/consts.util';
import { RegexUtil } from 'src/app/lib/core/utils/regex.util';
import { ChargeFormModalComponent } from '../../../catalogs/charges/components/modals/charge-form-modal/charge-form-modal.component';
import { ICharge } from '../../../catalogs/charges/interfaces/charge.interface';
import { WorkFormModalComponent } from '../../../catalogs/works/components/modals/work-form-modal/work-form-modal.component';
import { IWork } from '../../../catalogs/works/interfaces/work.interface';
import { ICustomer } from '../../../customers/interfaces/customer.interface';
import { Customer } from '../../../customers/models/customer.model';
import { OrderRepairApiService } from '../../api/order-repair.api.service';
import { CustomerFormShortModalComponent } from '../../components/modals/customer-form-short-modal/customer-form-short-modal.component';
import { DeviceFormModalComponent } from '../../components/modals/device-form-modal/device-form-modal.component';
import { SearchChargeModalComponent } from '../../components/modals/search-charge-modal/search-charge-modal.component';
import { SearchCustomerModalComponent } from '../../components/modals/search-customer-modal/search-customer-modal.component';
import { CompleteOrderRepairModalComponent } from '../../components/modals/complete-order-repair-modal/complete-order-repair-modal.component';
import { SearchWorkModalComponent } from '../../components/modals/search-work-modal/search-work-modal.component';
import { IDeviceOrderRepair, IOrderRepair } from '../../interfaces/order-repair.interface';

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
    works: new FormArray([]),
    charges: new FormArray([]),
    devices: new FormControl([]),
  });

  customerSelected: Customer;

  isSend = false;

  subscription: Subscription;

  currentDate = new Date();

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

  get works() {
    return this.form.controls['works'] as FormArray;
  }

  get charges() {
    return this.form.controls['charges'] as FormArray;
  }

  get devices() {
    return this.form.controls['devices'].value as Array<IDeviceOrderRepair>;
  }

  async onCreateCustomer(): Promise<void> {
    const formModal = await this._modalController.create({
      component: CustomerFormShortModalComponent,
      breakpoints: Consts.BREAKPOINTS_MODAL_FULL,
      initialBreakpoint: Consts.INITIAL_BREAKPOINT_MODAL_THREE_QUARTER,
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
      breakpoints: Consts.BREAKPOINTS_MODAL_FULL,
      initialBreakpoint: Consts.INITIAL_BREAKPOINT_MODAL_FULL,
      backdropDismiss: false
    });

    await searchModal.present();

    const { data } = await searchModal.onDidDismiss();

    if (data) {
      this._setCustomer(data);
    }
  }

  async onSearchWork(): Promise<void> {
    const searchModal = await this._modalController.create({
      component: SearchWorkModalComponent,
      breakpoints: Consts.BREAKPOINTS_MODAL_FULL,
      initialBreakpoint: Consts.INITIAL_BREAKPOINT_MODAL_FULL,
      backdropDismiss: false
    });

    await searchModal.present();

    const { data } = await searchModal.onDidDismiss();

    if (data) {
      this._setWork(data);
    }
  }

  async onCreateWork(): Promise<void> {
    const formModal = await this._modalController.create({
      component: WorkFormModalComponent,
      breakpoints: Consts.BREAKPOINTS_MODAL_FULL,
      initialBreakpoint: Consts.INITIAL_BREAKPOINT_MODAL_THREE_QUARTER,
      backdropDismiss: false,
      componentProps: {
        addText: 'Agregar Servicio'
      }
    });

    await formModal.present();

    const { data } = await formModal.onDidDismiss();

    if (data) {
      this._setWork(data);
    }
  }

  async onSearchCharge(): Promise<void> {
    const searchModal = await this._modalController.create({
      component: SearchChargeModalComponent,
      breakpoints: Consts.BREAKPOINTS_MODAL_FULL,
      initialBreakpoint: Consts.INITIAL_BREAKPOINT_MODAL_FULL,
      backdropDismiss: false
    });

    await searchModal.present();

    const { data } = await searchModal.onDidDismiss();

    if (data) {
      this._setCharge(data);
    }
  }

  async onCreateCharge(): Promise<void> {
    const formModal = await this._modalController.create({
      component: ChargeFormModalComponent,
      breakpoints: Consts.BREAKPOINTS_MODAL_FULL,
      initialBreakpoint: Consts.INITIAL_BREAKPOINT_MODAL_THREE_QUARTER,
      backdropDismiss: false,
      componentProps: {
        addText: 'Agregar Cargo'
      }
    });

    await formModal.present();

    const { data } = await formModal.onDidDismiss();

    if (data) {
      this._setCharge(data);
    }
  }

  async onAddDevice(): Promise<void> {
    const formModal = await this._modalController.create({
      component: DeviceFormModalComponent,
      backdropDismiss: false,
      componentProps: {
        addText: 'Agregar Dispositivo'
      }
    });

    await formModal.present();

    const { data } = await formModal.onDidDismiss();

    if (data) {
      this.devices.push(data);
    }
  }

  onCalculateAmount(): void {
    console.log(this.form.valid);
    console.log(this.form.value);
    if (this.form.valid) {
      // TODO: calculamos el importe total si el form esta correcto
      
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

  private _setWork(data: IWork): void {
    this.works.push(new FormGroup({
      workId: new FormControl(data._id, Validators.required),
      name: new FormControl(data.name, Validators.required),
      amount: new FormControl(data.amount, [Validators.required, Validators.pattern(RegexUtil.CURRENCY)]),
      notes: new FormControl(null)
    }));
  }

  private _setCharge(data: ICharge): void {
    this.charges.push(new FormGroup({
      chargeId: new FormControl(data._id, Validators.required),
      name: new FormControl(data.name, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(RegexUtil.CURRENCY)]),
      notes: new FormControl(null)
    }));
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

  async onSubmit(): Promise<void> {

    // TODO: if is create order then ask data to complete the order
    const formModal = await this._modalController.create({
      component: CompleteOrderRepairModalComponent,
      breakpoints: Consts.BREAKPOINTS_MODAL_FULL,
      initialBreakpoint: Consts.INITIAL_BREAKPOINT_MODAL_THREE_QUARTER,
      backdropDismiss: false,
      componentProps: {}
    });

    await formModal.present();

    // if (this.form.invalid) {
    //   this.form.markAllAsTouched();
    //   this._toastService.warning('Complete los campos obligatorios', 'Datos Incompletos');
    //   return;
    // }

    // this.isSend = true;

    // if (this.isEdit) {
    //   this._update();
    // } else {
    //   this._create();
    // }

  }

}
