import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { ToastService } from 'src/app/lib/core/services/toast.service';
import { BrandApiService } from '../../../api/brand.api.service';
import { DeviceApiService } from '../../../api/device.api.service';
import { IBrand } from '../../../interfaces/brand.interface';
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

  brands: Array<IBrand> = [];

  form = new FormGroup({
    device: new FormControl(null, Validators.required),
    brand: new FormControl(null, Validators.required),
    model: new FormControl(null),
    accessory: new FormControl(null, Validators.required),
    itsOn: new FormControl(false),
    cards: new FormControl(null),
    password: new FormControl(null),
    details: new FormControl(null, Validators.required),
    customerReport: new FormControl(null, Validators.required),
    finalDiagnosis: new FormControl(null),
    warrantyDays: new FormControl(0),
  });

  isSend = false;

  constructor(
    public modalController: ModalController,
    private _alertDialogService: AlertDialogService,
    private _toastService: ToastService,
    private _deviceApiService: DeviceApiService,
    private _brandApiService: BrandApiService
  ) { }

  ngOnInit() {
    this._loadDevices();
    this._loadBrands();
  }

  private async _loadDevices(): Promise<void> {

    try {
      const res = await this._deviceApiService.getAll({ searchText: '', limit: 20, page: 1 }).toPromise();
      this.devices = res.data.map(device => {
        return { deviceId: device._id, name: device.name };
      });
    } catch (error) {
      this._alertDialogService.catchError(error);
    }

  }

  private async _loadBrands(): Promise<void> {

    try {
      const res = await this._brandApiService.getAll({ searchText: '', limit: 20, page: 1 }).toPromise();
      this.brands = res.data.map(brand => {
        return { brandId: brand._id, name: brand.name };
      });
    } catch (error) {
      this._alertDialogService.catchError(error);
    }

  }

  onChangeDevice($event: string | IDevice | IBrand, origin: string): void {
    if ($event === 'new' && origin === 'device') {
      this._createDevice();
    }

    if ($event === 'new' && origin === 'brand') {
      this._createBrand();
    }
  }

  onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this._toastService.warning('Complete los campos obligatorios', 'Datos Incompletos');
      return;
    }

    this.isSend = true;

    this.modalController.dismiss(this.form.value);

  }

  private async _createDevice(): Promise<void> {

    const value = await this._alertDialogService.inputField('Agregar dispositivo', null, null, null, 'Nombre de dispositivo');

    if (!value) {
      this._toastService.warning('No se agrego el nuevo dispositivo', 'Operación incompleta');
      this.form.controls['device'].reset();
      return;
    }

    try {
      const deviceCreated = await this._deviceApiService.create({ name: value }).toPromise();
      this._toastService.success('Dispositivo creado correctamente', 'Operación Completada');
      this.devices.unshift({ deviceId: deviceCreated._id, name: deviceCreated.name } as IDevice);
      this.form.controls['device'].setValue(this.devices[0]);
    } catch (error) {
      this._alertDialogService.catchError(error);
    }

  }

  private async _createBrand(): Promise<void> {

    const value = await this._alertDialogService.inputField('Agregar marca', null, null, null, 'Nombre de la marca');

    if (!value) {
      this._toastService.warning('No se agrego la nueva marca', 'Operación incompleta');
      this.form.controls['brand'].reset();
      return;
    }

    try {
      const brandCreated = await this._brandApiService.create({ name: value }).toPromise();
      this._toastService.success('Marca creada correctamente', 'Operación Completada');
      this.brands.unshift({ brandId: brandCreated._id, name: brandCreated.name } as IBrand);
      this.form.controls['brand'].setValue(this.brands[0]);
    } catch (error) {
      this._alertDialogService.catchError(error);
    }

  }

}
