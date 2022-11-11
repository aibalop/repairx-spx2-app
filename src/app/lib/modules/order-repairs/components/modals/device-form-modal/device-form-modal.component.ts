import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { ToastService } from 'src/app/lib/core/services/toast.service';
import { DeviceApiService } from '../../../api/device.api.service';
import { IDevice } from '../../../interfaces/device.interface';

@Component({
  selector: 'app-device-form-modal',
  templateUrl: './device-form-modal.component.html',
  styleUrls: ['./device-form-modal.component.scss'],
})
export class DeviceFormModalComponent implements OnInit {

  @Input() isView: boolean = false;

  @Input() isEdit: boolean = false;

  @Input() deviceId: string;

  @Input() addText: string;

  form = new FormGroup({
    name: new FormControl(null, Validators.required)
  });

  isSend = false;

  constructor(
    private _modalController: ModalController,
    private _alertDialogService: AlertDialogService,
    private _toastService: ToastService,
    private _deviceApiService: DeviceApiService
  ) { }

  ngOnInit() {
    if (this.deviceId) {
      this._getDevice();
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

  private async _getDevice(): Promise<void> {

    try {
      const charge = await this._deviceApiService.getById(this.deviceId).toPromise();
      this.form.patchValue(charge);
    } catch (error) {
      this._toastService.danger('No se pudo obtener los datos del dispositivo', 'Operación Fallida');
      this._alertDialogService.catchError(error);
      this._modalController.dismiss(true);
    }

  }

  private async _create(): Promise<void> {

    try {
      const deviceCreated = await this._deviceApiService.create(this.form.value as IDevice).toPromise();
      this._toastService.success('Dispositivo creado correctamente', 'Operación Completada');
      this._modalController.dismiss(deviceCreated);
    } catch (error) {
      this.isSend = false;
      this._toastService.danger('No se pudo completar el registro', 'Operación Fallida');
      this._alertDialogService.catchError(error);
    }

  }

  private async _update(): Promise<void> {

    try {
      const deviceUpdated = await this._deviceApiService.update(this.deviceId, this.form.value as IDevice).toPromise();
      this._toastService.success('Dispositivo actualizado correctamente', 'Operación Completada');
      this._modalController.dismiss(deviceUpdated);
    } catch (error) {
      this.isSend = false;
      this._toastService.danger('No se pudo completar la actualización', 'Operación Fallida');
      this._alertDialogService.catchError(error);
    }

  }

}