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

  devices: Array<IDevice> = [];

  form = new FormGroup({
    device: new FormControl(null, Validators.required),
    brand: new FormControl(null, Validators.required),
    model: new FormControl(null),
    accessory: new FormControl(null, Validators.required),
    itsOn: new FormControl(null),
    cards: new FormControl(null),
    password: new FormControl(null),
    details: new FormControl(null, Validators.required),
    customerReport: new FormControl(null, Validators.required),
    finalDiagnosis: new FormControl(null),
    warrantyDays: new FormControl(0),
  });

  isSend = false;

  constructor(
    private _modalController: ModalController,
    private _alertDialogService: AlertDialogService,
    private _toastService: ToastService,
    private _deviceApiService: DeviceApiService,
  ) { }

  ngOnInit() {
    this._loadDevices();
  }

  private async _loadDevices(): Promise<void> {

    try {
      const res = await this._deviceApiService.getAll({ searchText: '', limit: 20, page: 1 }).toPromise();
      this.devices = res.data;
    } catch (error) {
      this._alertDialogService.catchError(error);
    }

  }

  onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this._toastService.warning('Complete los campos obligatorios', 'Datos Incompletos');
      return;
    }

    this.isSend = true;

    // if (this.isEdit) {
    //   this._update();
    // } else {
    //   this._create();
    // }

  }

  async onCreateDevice(): Promise<void> {

    const value = await this._alertDialogService.inputField('Agregar dispositivo', null, null, null, 'Nombre de dispositivo');

    if (!value) {
      this._toastService.warning('No se agrego el nuevo dispositivo', 'Operación incompleta');
      return;
    }

    try {
      const deviceCreated = await this._deviceApiService.create({ name: value } as IDevice).toPromise();
      this._toastService.success('Dispositivo creado correctamente', 'Operación Completada');
      this.devices.unshift(deviceCreated);
    } catch (error) {
      this._alertDialogService.catchError(error);
    }

  }

}