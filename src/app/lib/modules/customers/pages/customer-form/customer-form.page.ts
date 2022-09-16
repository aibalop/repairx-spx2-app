import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomersRoutes } from 'src/app/lib/core/enums/modules-routes.enum';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { ToastService } from 'src/app/lib/core/services/toast.service';
import { CustomerApiService } from '../../api/customer.api.service';
import { ICustomer } from '../../interfaces/customer.interface';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.page.html',
  styleUrls: ['./customer-form.page.scss'],
})
export class CustomerFormPage implements OnInit, OnDestroy {

  titleHeader: string = 'Nuevo Cliente';

  isView: boolean = false;

  isEdit: boolean = false;

  customerId: string;

  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    surName: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl(null, Validators.email),
    address: new FormGroup({
      street: new FormControl(null),
      num: new FormControl(null),
      interiorNum: new FormControl(null),
      colony: new FormControl(null),
      zip: new FormControl(null),
      location: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      country: new FormControl(null)
    }),
  });

  isSend = false;

  subscription: Subscription;

  constructor(
    private _alertDialogService: AlertDialogService,
    private _toastService: ToastService,
    private _customerApiService: CustomerApiService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {

    this.isView = this._router.url.includes(CustomersRoutes.CUSTOMERS_VIEW);

    this.isEdit = this._router.url.includes(CustomersRoutes.CUSTOMERS_EDIT);

    this.titleHeader = this.isView ? 'Ver Cliente' : this.titleHeader;

    this.titleHeader = this.isEdit ? 'Editar Cliente' : this.titleHeader;

  }

  ngOnInit() {

    if (this.isEdit || this.isView) {

      this.subscription = this._activatedRoute.params.subscribe(params => {

        this.customerId = params['customerId'];

        if (this.customerId) {
          this._getCustomer();
        } else {
          this._router.navigate([CustomersRoutes.CUSTOMERS]);
        }

      });

    }

  }

  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

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

  private async _getCustomer(): Promise<void> {

    try {
      const customer = await this._customerApiService.getById(this.customerId).toPromise();
      this.form.patchValue(customer);
    } catch (error) {
      this._toastService.danger('No se pudo obtener los datos del cliente', 'Operación Fallida');
      this._alertDialogService.catchError(error);
      this._router.navigate([CustomersRoutes.CUSTOMERS]);
    }

  }

  private async _create(): Promise<void> {

    try {
      await this._customerApiService.create(this.form.value as ICustomer).toPromise();
      this._toastService.success('Cliente creado correctamente', 'Operación Completada');
      this._router.navigate([CustomersRoutes.CUSTOMERS]);
    } catch (error) {
      this.isSend = false;
      this._toastService.danger('No se pudo completar el registro', 'Operación Fallida');
      this._alertDialogService.catchError(error);
    }

  }

  private async _update(): Promise<void> {

    try {
      await this._customerApiService.update(this.customerId, this.form.value as ICustomer).toPromise();
      this._toastService.success('Cliente actualizado correctamente', 'Operación Completada');
      this._router.navigate([CustomersRoutes.CUSTOMERS]);
    } catch (error) {
      this.isSend = false;
      this._toastService.danger('No se pudo completar la actualización', 'Operación Fallida');
      this._alertDialogService.catchError(error);
    }

  }

}
