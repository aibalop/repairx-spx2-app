import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EDateFilterOption } from 'src/app/lib/core/enums/helpers-emuns.enum';
import { EOrderRepairsRoutes, ESettingsRoutes } from 'src/app/lib/core/enums/modules-routes.enum';
import { EOrderRepairStatus } from 'src/app/lib/core/enums/status.enum';
import { IFilterGeneric } from 'src/app/lib/core/interfaces/filter-generic.interface';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { SessionService } from 'src/app/lib/core/services/session.service';
import { OrderRepairApiService } from '../../../order-repairs/api/order-repair.api.service';
import { OrderRepair } from '../../../order-repairs/models/order-repair.model';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.page.html',
  styleUrls: ['./home-dashboard.page.scss'],
})
export class HomeDashboardPage implements OnInit {

  filters: IFilterGeneric = {
    searchText: '',
    status: [EOrderRepairStatus.PENDING],
    timeZone: new Date().getTimezoneOffset(),
    dateFilterOption: EDateFilterOption.DEFAULT,
    isPaid: 'both',
    limit: 5,
    page: 1
  };

  settingsRoutes = ESettingsRoutes;

  lastOrders: Array<OrderRepair> = [];

  ordersPendingToPay: Array<OrderRepair> = [];

  constructor(
    public sessionService: SessionService,
    private _orderRepairApiService: OrderRepairApiService,
    private _alertDialogService: AlertDialogService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this._loadData();
  }

  onDateChange(updatedFilters: IFilterGeneric): void {
    this.filters = updatedFilters;
    this._loadData();
  }

  onViewOrder(orderRepairId: string): void {
    this._router.navigate([EOrderRepairsRoutes.ORDER_REPAIRS_VIEW, orderRepairId]);
  }

  private async _loadData(): Promise<void> {

    try {

      console.log('Filters: ', this.filters);

      const resLastOrders = await this._orderRepairApiService.getAll(this.filters).toPromise();

      this.lastOrders = resLastOrders.data.map(orderRepair => new OrderRepair(orderRepair)) as Array<OrderRepair>;

      const resOrdersPendingToPay = await this._orderRepairApiService.getAll({
        ...this.filters,
        status: [EOrderRepairStatus.COMPLETED, EOrderRepairStatus.DELIVERED],
        isPaid: 'false',
      }).toPromise();

      this.ordersPendingToPay = resOrdersPendingToPay.data.map(orderRepair => new OrderRepair(orderRepair)) as Array<OrderRepair>;

      console.log('LastOrders: ', this.lastOrders, 'PendingToPay: ', this.ordersPendingToPay);

    } catch (error) {

      this._alertDialogService.catchError(error);

    }

  }

}
