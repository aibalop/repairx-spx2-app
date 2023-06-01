import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { ToastService } from 'src/app/lib/core/services/toast.service';
import { CompanyApiService } from 'src/app/lib/modules/companies/api/company.api.service';
import { ICompany } from 'src/app/lib/modules/companies/interfaces/company.interface';

@Component({
  selector: 'app-company-form-modal',
  templateUrl: './company-form-modal.component.html',
  styleUrls: ['./company-form-modal.component.scss'],
})
export class CompanyFormModalComponent implements OnInit {

  @Input() companyId: string;

  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    address: new FormGroup({
      street: new FormControl(null, Validators.required),
      num: new FormControl(null, Validators.required),
      interiorNum: new FormControl(null),
      colony: new FormControl(null, Validators.required),
      zip: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      country: new FormControl('México', Validators.required)
    }),
  });

  isSend = false;

  constructor(
    private _modalController: ModalController,
    private _companyApiService: CompanyApiService,
    private _alertDialogService: AlertDialogService,
    private _toastService: ToastService,
  ) {
  }

  ngOnInit() {
    this._getCompany();
  }

  onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this._toastService.warning('Complete los campos obligatorios', 'Datos Incompletos');
      return;
    }

    this.isSend = true;

    this._update();

  }

  private async _update(): Promise<void> {

    try {
      const data = this.form.value as ICompany;
      await this._companyApiService.update(this.companyId, data).toPromise();
      this._toastService.success('Datos de empresa actualizados correctamente');
      this._modalController.dismiss({ _id: this.companyId, ...data });
    } catch (error) {
      this.isSend = false;
      this._toastService.danger('No se pudo completar la actualización');
      this._alertDialogService.catchError(error);
    }

  }

  private async _getCompany(): Promise<void> {

    try {
      const data = await this._companyApiService.getById(this.companyId).toPromise();
      this.form.patchValue(data);
    } catch (error) {
      this._toastService.danger('No se pudo completar la actualización');
      this._alertDialogService.catchError(error);
      this._modalController.dismiss();
    }

  }

}
