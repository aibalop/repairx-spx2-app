import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EDateFilterOption } from 'src/app/lib/core/enums/helpers-emuns.enum';
import { EOrderRepairsRoutes, ESettingsRoutes } from 'src/app/lib/core/enums/modules-routes.enum';
import { EOrderRepairStatus } from 'src/app/lib/core/enums/status.enum';
import { IFilterGeneric } from 'src/app/lib/core/interfaces/filter-generic.interface';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { SessionService } from 'src/app/lib/core/services/session.service';
import { DatesHelper } from 'src/app/lib/core/utils/dates-helper.util';
import { OrderRepairApiService } from '../../../order-repairs/api/order-repair.api.service';
import { OrderRepair } from '../../../order-repairs/models/order-repair.model';
import { DashboardApiService, SummaryData } from '../../api/dashboard.api.service';

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
    dateFilterOption: EDateFilterOption.CURRENT_MONTH,
    isPaid: 'both',
    limit: 5,
    page: 1
  };

  summary: SummaryData = {
    revenue: 0,
    totalNewCustomers: 0,
    totalOrderRepairs: 0,
  };

  settingsRoutes = ESettingsRoutes;

  lastOrders: Array<OrderRepair> = [];

  ordersPendingToPay: Array<OrderRepair> = [];

  constructor(
    public sessionService: SessionService,
    private _orderRepairApiService: OrderRepairApiService,
    private _dashboardApiService: DashboardApiService,
    private _alertDialogService: AlertDialogService,
    private _router: Router,
  ) {
    const currentMonth = DatesHelper.getTimeRangeForCurrentMonth();
    this.filters.fromDate = currentMonth.fromDate;
    this.filters.toDate = currentMonth.toDate;
  }

  ngOnInit() {
    this._loadData();
    this._loadSummary();
  }

  onDateChange(updatedFilters: IFilterGeneric): void {
    this.filters = updatedFilters;
    this._loadData();
    this._loadSummary();
  }

  onViewOrder(orderRepairId: string): void {
    this._router.navigate([EOrderRepairsRoutes.ORDER_REPAIRS_VIEW, orderRepairId]);
  }

  private async _loadData(): Promise<void> {

    try {

      const resLastOrders = await this._orderRepairApiService.getAll(this.filters).toPromise();

      this.lastOrders = resLastOrders.data.map(orderRepair => new OrderRepair(orderRepair)) as Array<OrderRepair>;

      const resOrdersPendingToPay = await this._orderRepairApiService.getAll({
        ...this.filters,
        status: [EOrderRepairStatus.COMPLETED, EOrderRepairStatus.DELIVERED],
        isPaid: 'false',
      }).toPromise();

      this.ordersPendingToPay = resOrdersPendingToPay.data.map(orderRepair => new OrderRepair(orderRepair)) as Array<OrderRepair>;

    } catch (error) {

      this._alertDialogService.catchError(error);

    }

  }

  private async _loadSummary(): Promise<void> {

    try {

      this.summary = await this._dashboardApiService.getSummary(this.filters).toPromise();

    } catch (error) {

      this._alertDialogService.catchError(error);

    }

  }

}
