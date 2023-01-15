import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderRepairDeviceStatus} from '../../../../core/enums/status.enum';
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
  @Output() statusChanged = new EventEmitter<string>();
  orderRepairDeviceStatus = OrderRepairDeviceStatus;
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
      case OrderRepairDeviceStatus.IN_PROGRESS:
        return 'medium';
      case OrderRepairDeviceStatus.DONE:
        return 'success';
      case OrderRepairDeviceStatus.CANCELED:
        return 'danger';
    }
  }

  async onChangeStatus(): Promise<void> {

    if (this.isView || this.isSent ||
      this.currentStatus === OrderRepairDeviceStatus.CANCELED || this.currentStatus === OrderRepairDeviceStatus.DONE) {
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
      await this._orderRepairApiService.updateDeviceStatus(this.orderRepairId, newStatus).toPromise();
      this._toastService.success('Estatus actualizado correctamente', 'Operación Completada');
      this.statusChanged.emit(newStatus);
      this.isSent = false;
    } catch (error) {
      this._toastService.danger('No se pudo completar la actualización del pago', 'Operación Fallida');
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
          text: OrderRepairDeviceStatus.DONE,
          data: {
            action: OrderRepairDeviceStatus.DONE,
          },
        },
        {
          text: OrderRepairDeviceStatus.CANCELED,
          data: {
            action: OrderRepairDeviceStatus.CANCELED,
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
