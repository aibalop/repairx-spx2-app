import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlertDialogService} from '../../../../core/services/alert-dialog.service';
import {ToastService} from '../../../../core/services/toast.service';
import {OrderRepairApiService} from '../../api/order-repair.api.service';

@Component({
  selector: 'app-order-repair-paid-status',
  templateUrl: './order-repair-paid-status.component.html',
  styleUrls: ['./order-repair-paid-status.component.scss'],
})
export class OrderRepairPaidStatusComponent implements OnInit {

  @Input() orderRepairId: string;
  @Input() isPaid: boolean;
  @Output() paymentCompleted = new EventEmitter<Date>();

  constructor(
    private _alertDialogService: AlertDialogService,
    private _toastService: ToastService,
    private _orderRepairApiService: OrderRepairApiService
  ) {
  }

  ngOnInit() {
  }

  async onPay(): Promise<void> {

    if (this.isPaid) {
      return;
    }

    const answer = await this._alertDialogService.confirm('Confirmar', '¿Marcar como pagado?');

    if (!answer) {
      return;
    }

    this.isPaid = true;

    try {
      const paidAt = new Date();
      await this._orderRepairApiService.updateStatusPay(this.orderRepairId, paidAt).toPromise();
      this._toastService.success('Pago actualizado correctamente', 'Operación Completada');
      this.paymentCompleted.emit(paidAt);
    } catch (error) {
      this._toastService.danger('No se pudo completar la actualización del pago', 'Operación Fallida');
      this._alertDialogService.catchError(error);
      this.isPaid = false;
    }
  }

}
