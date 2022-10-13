import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { ToastService } from 'src/app/lib/core/services/toast.service';
import { CustomerApiService } from 'src/app/lib/modules/customers/api/customer.api.service';
import { ICustomer } from 'src/app/lib/modules/customers/interfaces/customer.interface';

@Component({
  selector: 'app-customer-form-short-modal',
  templateUrl: './customer-form-short-modal.component.html',
  styleUrls: ['./customer-form-short-modal.component.scss'],
})
export class CustomerFormShortModalComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    surName: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl(null, Validators.email),
  });

  isSend = false;

  constructor(
    private _modalController: ModalController,
    private _alertDialogService: AlertDialogService,
    private _toastService: ToastService,
    private _customerApiService: CustomerApiService
  ) { }

  ngOnInit() { }

  onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this._toastService.warning('Complete los campos obligatorios', 'Datos Incompletos');
      return;
    }

    this.isSend = true;

    this._create();

  }

  private async _create(): Promise<void> {

    try {
      const customerCreated = await this._customerApiService.create(this.form.value as ICustomer).toPromise();
      this._toastService.success('Cliente creado correctamente', 'Operación Completada');
      this._modalController.dismiss(customerCreated);
    } catch (error) {
      this.isSend = false;
      this._toastService.danger('No se pudo completar el registro', 'Operación Fallida');
      this._alertDialogService.catchError(error);
    }

  }

}
