import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { EOrderRepairsRoutes } from 'src/app/lib/core/enums/modules-routes.enum';
import { IFilterGeneric } from 'src/app/lib/core/interfaces/filter-generic.interface';
import { IPaginationData } from 'src/app/lib/core/interfaces/pagination-data.interface';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { EOrderRepairStatus } from '../../../../core/enums/status.enum';
import { EDateFilterOption } from 'src/app/lib/core/enums/helpers-emuns.enum';
import { PdfUtil } from 'src/app/lib/core/utils/pdf.util';
import { OrderRepair } from '../../../order-repairs/models/order-repair.model';
import { OrderRepairApiService } from '../../../order-repairs/api/order-repair.api.service';

@Component({
  selector: 'app-orders-report',
  templateUrl: './orders-report.page.html',
  styleUrls: ['./orders-report.page.scss'],
})
export class OrdersReportPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  list: IPaginationData<OrderRepair>;

  filters: IFilterGeneric;

  constructor(
    private _orderRepairApiService: OrderRepairApiService,
    private _alertDialogService: AlertDialogService,
    private _router: Router
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.filters = {
      searchText: '',
      status: [EOrderRepairStatus.COMPLETED],
      timeZone: new Date().getTimezoneOffset(),
      dateFilterOption: EDateFilterOption.DEFAULT,
      isPaid: 'true',
      limit: 25,
      page: 1
    };
    this._loadData();
  }

  async onOpenForm(_id: string = '', isView: boolean = false): Promise<void> {

    if (!_id && !isView) {
      this._router.navigate([EOrderRepairsRoutes.ORDER_REPAIRS_NEW]);
    }

    if (_id && !isView) {
      this._router.navigate([EOrderRepairsRoutes.ORDER_REPAIRS_EDIT, _id]);
    }

    if (_id && isView) {
      this._router.navigate([EOrderRepairsRoutes.ORDER_REPAIRS_VIEW, _id]);
    }

  }

  doInfinite(event: any): void {
    this._loadData(true, event);
  }

  onSearch($event: string): void {
    this.filters.searchText = $event;
    this._loadData();
  }

  onFilter($event: IFilterGeneric): void {
    this.filters = $event;
    this._loadData();
  }

  onStatusChanged(): void {
    this._loadData();
  }

  async onPrintOrder(orderId: string): Promise<void> {
    try {
      const res = await this._orderRepairApiService.getPDFByOrderId(orderId).toPromise();
      PdfUtil.print(res);
    } catch (error) {
      this._alertDialogService.catchError(error);
    }
  }

  private async _loadData(onLoadMore: boolean = false, event: any = null): Promise<void> {

    try {

      if (onLoadMore) {
        this.filters.page++;
      } else {
        this.filters.page = 1;
        if (this.infiniteScroll) {
          this.infiniteScroll.disabled = false;
        }
      }

      const res = await this._orderRepairApiService.getAll(this.filters).toPromise();

      const data = res.data.map(orderRepair => new OrderRepair(orderRepair)) as Array<OrderRepair>;

      if (onLoadMore) {
        this.list = {
          ...res,
          data: this.list.data.concat(data)
        };
      } else {
        this.list = { ...res, data };
      }

      if (onLoadMore) {
        event.target.complete();

        if (this.list.data.length === this.list.count) {
          event.target.disabled = true;
        }
      }
    } catch (error) {
      this._alertDialogService.catchError(error);
    }

  }

}
