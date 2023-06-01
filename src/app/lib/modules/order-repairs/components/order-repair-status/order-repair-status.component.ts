import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertDialogService } from '../../../../core/services/alert-dialog.service';
import { ToastService } from '../../../../core/services/toast.service';
import { OrderRepairApiService } from '../../api/order-repair.api.service';
import { ActionSheetController } from '@ionic/angular';
import { EOrderRepairStatus } from '../../../../core/enums/status.enum';

@Component({
  selector: 'app-order-repair-status',
  templateUrl: './order-repair-status.component.html',
  styleUrls: ['./order-repair-status.component.scss'],
})
export class OrderRepairStatusComponent implements OnInit {

  @Input() isView = false;
  @Input() orderRepairId: string;
  @Input() set currentStatus(status: string) {
    this._currentStatus = status;
    this.statusColor = this.getStatusColor();
  };
  @Input() showChip: boolean = true;
  @Output() statusChanged = new EventEmitter<string>();

  _currentStatus: string;
  statusColor: string;
  orderRepairStatus = EOrderRepairStatus;
  isSent = false;

  constructor(
    private _alertDialogService: AlertDialogService,
    private _toastService: ToastService,
    private _orderRepairApiService: OrderRepairApiService,
    private _actionSheetCtrl: ActionSheetController,
  ) {
  }

  ngOnInit() { }

  getStatusColor(): string {
    switch (this._currentStatus) {
      case EOrderRepairStatus.PENDING:
        return 'medium';
      case EOrderRepairStatus.COMPLETED:
        return 'primary';
      case EOrderRepairStatus.DELIVERED:
        return 'success';
      case EOrderRepairStatus.CANCELED:
        return 'danger';
    }
  }

  async onChangeStatus(): Promise<void> {

    if (this.isView || this.isSent ||
      this._currentStatus === EOrderRepairStatus.DELIVERED || this._currentStatus === EOrderRepairStatus.CANCELED) {
      return;
    }

    const { data: { action: newStatus }, role = null } = await this._getNewStatus();

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
      this._toastService.success('Estatus actualizado correctamente');
      this.statusChanged.emit(newStatus);
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
      subHeader: 'Cambiar estatus de la orden de reparación',
      mode: 'ios',
      buttons: [
        {
          text: EOrderRepairStatus.COMPLETED,
          data: {
            action: EOrderRepairStatus.COMPLETED,
          },
        },
        {
          text: EOrderRepairStatus.DELIVERED,
          data: {
            action: EOrderRepairStatus.DELIVERED,
          },
        },
        {
          text: EOrderRepairStatus.CANCELED,
          data: {
            action: EOrderRepairStatus.CANCELED,
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ].filter(button => button.text !== this._currentStatus),
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();

    return result;
  }

}
