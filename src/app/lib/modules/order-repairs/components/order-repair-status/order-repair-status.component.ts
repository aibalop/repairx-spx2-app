import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlertDialogService} from '../../../../core/services/alert-dialog.service';
import {ToastService} from '../../../../core/services/toast.service';
import {OrderRepairApiService} from '../../api/order-repair.api.service';
import {ActionSheetController} from '@ionic/angular';
import {OrderRepairStatus} from '../../../../core/enums/status.enum';

@Component({
  selector: 'app-order-repair-status',
  templateUrl: './order-repair-status.component.html',
  styleUrls: ['./order-repair-status.component.scss'],
})
export class OrderRepairStatusComponent implements OnInit {

  @Input() isView: boolean = false;
  @Input() orderRepairId: string;
  @Input() currentStatus: string;
  @Output() statusChanged = new EventEmitter<string>();
  orderRepairStatus = OrderRepairStatus;
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
      case OrderRepairStatus.PENDING:
        return 'medium';
      case OrderRepairStatus.COMPLETED:
        return 'primary';
      case OrderRepairStatus.DELIVERED:
        return 'success';
      case OrderRepairStatus.CANCELED:
        return 'danger';
    }
  }

  async onChangeStatus(): Promise<void> {

    if (this.isView || this.isSent ||
      this.currentStatus === OrderRepairStatus.DELIVERED || this.currentStatus === OrderRepairStatus.CANCELED) {
      return;
    }

    const {data: {action: newStatus}, role = null} = await this._getNewStatus();

    if (newStatus === 'cancel' || role === 'backdrop') {
      return;
    }

    const answer = await this._alertDialogService.confirm('Confirmar', `¿Cambiar estatus de la orden a ${newStatus}?`);

    if (!answer) {
      return;
    }

    this.isSent = true;

    try {
      await this._orderRepairApiService.updateStatus(this.orderRepairId, newStatus).toPromise();
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
      subHeader: 'Cambiar estatus de la orden de reparación',
      mode: 'ios',
      buttons: [
        {
          text: OrderRepairStatus.COMPLETED,
          data: {
            action: OrderRepairStatus.COMPLETED,
          },
        },
        {
          text: OrderRepairStatus.DELIVERED,
          data: {
            action: OrderRepairStatus.DELIVERED,
          },
        },
        {
          text: OrderRepairStatus.CANCELED,
          data: {
            action: OrderRepairStatus.CANCELED,
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
