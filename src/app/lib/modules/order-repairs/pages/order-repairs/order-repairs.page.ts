import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {IonInfiniteScroll} from '@ionic/angular';
import {EOrderRepairsRoutes} from 'src/app/lib/core/enums/modules-routes.enum';
import {IFilterGeneric} from 'src/app/lib/core/interfaces/filter-generic.interface';
import {IPaginationData} from 'src/app/lib/core/interfaces/pagination-data.interface';
import {AlertDialogService} from 'src/app/lib/core/services/alert-dialog.service';
import {ToastService} from 'src/app/lib/core/services/toast.service';
import {OrderRepairApiService} from '../../api/order-repair.api.service';
import {OrderRepair} from '../../models/order-repair.model';
import {EOrderRepairStatus} from '../../../../core/enums/status.enum';

@Component({
  selector: 'app-order-repairs',
  templateUrl: './order-repairs.page.html',
  styleUrls: ['./order-repairs.page.scss'],
})
export class OrderRepairsPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  list: IPaginationData<OrderRepair>;

  filters: IFilterGeneric;

  orderRepairStatus = EOrderRepairStatus;

  constructor(
    private _orderRepairApiService: OrderRepairApiService,
    private _alertDialogService: AlertDialogService,
    private _toastService: ToastService,
    private _router: Router
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.filters = {
      searchText: '',
      status: [this.orderRepairStatus.PENDING],
      isPaid: 'both',
      limit: 20,
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
        this.list = {...res, data};
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
