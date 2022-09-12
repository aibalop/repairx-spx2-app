import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { ToastService } from 'src/app/lib/core/services/toast.service';
import { ChargeApiService } from '../../../api/charge.api.service';
import { ICharge } from '../../../interfaces/charge.interface';

@Component({
  selector: 'app-charge-form-modal',
  templateUrl: './charge-form-modal.component.html',
  styleUrls: ['./charge-form-modal.component.scss'],
})
export class ChargeFormModalComponent implements OnInit {

  @Input() isView: boolean = false;

  @Input() isEdit: boolean = false;

  @Input() chargeId: string;

  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null)
  });

  isSend = false;

  constructor(
    private _modalController: ModalController,
    private _alertDialogService: AlertDialogService,
    private _toastService: ToastService,
    private _chargeApiService: ChargeApiService
  ) { }

  ngOnInit() {
    if (this.chargeId) {
      this._getCharge();
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

  private async _getCharge(): Promise<void> {

    try {
      const charge = await this._chargeApiService.getById(this.chargeId).toPromise();
      this.form.patchValue(charge);
    } catch (error) {
      this._toastService.danger('No se pudo obtener los datos del cargo', 'Operación Fallida');
      this._alertDialogService.catchError(error);
      this._modalController.dismiss(true);
    }

  }

  private async _create(): Promise<void> {

    try {
      const chargeCreated = await this._chargeApiService.create(this.form.value as ICharge).toPromise();
      this._toastService.success('Cargo creado correctamente', 'Operación Completada');
      this._modalController.dismiss(chargeCreated);
    } catch (error) {
      this.isSend = false;
      this._toastService.danger('No se pudo completar el registro', 'Operación Fallida');
      this._alertDialogService.catchError(error);
    }

  }

  private async _update(): Promise<void> {

    try {
      const chargeUpdated = await this._chargeApiService.update(this.chargeId, this.form.value as ICharge).toPromise();
      this._toastService.success('Cargo actualizado correctamente', 'Operación Completada');
      this._modalController.dismiss(chargeUpdated);
    } catch (error) {
      this.isSend = false;
      this._toastService.danger('No se pudo completar la actualización', 'Operación Fallida');
      this._alertDialogService.catchError(error);
    }

  }

}
