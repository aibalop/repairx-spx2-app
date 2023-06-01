import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EOrderRepairDeviceStatus} from '../../../../core/enums/status.enum';
import {AlertDialogService} from '../../../../core/services/alert-dialog.service';
import {ToastService} from '../../../../core/services/toast.service';
import {OrderRepairApiService} from '../../api/order-repair.api.service';
import {ActionSheetController} from '@ionic/angular';

@Component({
  selector: 'app-order-repair-device-status',
  templateUrl: './order-repair-device-status.component.html',
  styleUrls: ['./order-repair-device-status.component.scss'],
})
export class OrderRepairDeviceStatusComponent implements OnInit {

  @Input() isView = false;
  @Input() orderRepairId: string;
  @Input() currentStatus: string;
  @Input() index: number;
  @Output() statusChanged = new EventEmitter<{
    newStatus: string;
    index: number;
  }>();
  orderRepairDeviceStatus = EOrderRepairDeviceStatus;
  isSent = false;

  constructor(
    private _alertDialogService: AlertDialogService,
    private _toastService: ToastService,
    private _orderRepairApiService: OrderRepairApiService,
    private _actionSheetCtrl: ActionSheetController,
  ) {
  }

  ngOnInit() {
  }

  onGetColor(): string {
    switch (this.currentStatus) {
      case EOrderRepairDeviceStatus.IN_PROGRESS:
        return 'medium';
      case EOrderRepairDeviceStatus.DONE:
        return 'success';
      case EOrderRepairDeviceStatus.CANCELED:
        return 'danger';
    }
  }

  async onChangeStatus(): Promise<void> {

    if (this.isView || this.isSent ||
      this.currentStatus === EOrderRepairDeviceStatus.CANCELED || this.currentStatus === EOrderRepairDeviceStatus.DONE) {
      return;
    }

    const {data: {action: newStatus}, role = null} = await this._getNewStatus();

    if (newStatus === 'cancel' || role === 'backdrop') {
      return;
    }

    const answer = await this._alertDialogService.confirm('Confirmar', `¿Cambiar estatus del dispositivo a ${newStatus}?`);

    if (!answer) {
      return;
    }

    this.isSent = true;

    try {
      await this._orderRepairApiService.updateDeviceStatus(this.orderRepairId, this.index, newStatus).toPromise();
      this._toastService.success('Estatus actualizado correctamente');
      this.statusChanged.emit({newStatus, index: this.index});
      this.isSent = false;
    } catch (error) {
      this._toastService.danger('No se pudo completar la actualización del pago');
      this._alertDialogService.catchError(error);
      this.isSent = false;
    }
  }

  async _getNewStatus() {
    const actionSheet = await this._actionSheetCtrl.create({
      header: 'Nuevo estatus',
      subHeader: 'Cambiar estatus de avance del dispositivo',
      mode: 'ios',
      buttons: [
        {
          text: EOrderRepairDeviceStatus.DONE,
          data: {
            action: EOrderRepairDeviceStatus.DONE,
          },
        },
        {
          text: EOrderRepairDeviceStatus.CANCELED,
          data: {
            action: EOrderRepairDeviceStatus.CANCELED,
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ].filter(button => button.text !== this.currentStatus),
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();

    return result;
  }

}
