import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { ECustomersRoutes } from 'src/app/lib/core/enums/modules-routes.enum';
import { IFilterGeneric } from 'src/app/lib/core/interfaces/filter-generic.interface';
import { IPaginationData } from 'src/app/lib/core/interfaces/pagination-data.interface';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { ToastService } from 'src/app/lib/core/services/toast.service';
import { CustomerApiService } from '../../api/customer.api.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  list: IPaginationData<Customer>;

  filters: IFilterGeneric;

  constructor(
    private _customerApiService: CustomerApiService,
    private _alertDialogService: AlertDialogService,
    private _toastService: ToastService,
    private _router: Router
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.filters = {
      searchText: '',
      limit: 20,
      page: 1
    };
    this._loadData();
  }

  async onOpenForm(_id: string = '', isView: boolean = false): Promise<void> {

    if (!_id && !isView) {
      this._router.navigate([ECustomersRoutes.CUSTOMERS_NEW]);
    }

    if (_id && !isView) {
      this._router.navigate([ECustomersRoutes.CUSTOMERS_EDIT, _id]);
    }

    if (_id && isView) {
      this._router.navigate([ECustomersRoutes.CUSTOMERS_VIEW, _id]);
    }

  }

  doInfinite(event: any): void {
    this._loadData(true, event);
  }

  onSearch($event: string): void {
    this.filters.searchText = $event;
    this._loadData();
  }

  async onDelete(_id: string): Promise<void> {

    try {
      const isConfirm = await this._alertDialogService.confirm('Confirmar', '¿Desea eliminar al cliente?');

      if (!isConfirm) {
        return;
      }

      await this._customerApiService.delete(_id).toPromise();
      this._toastService.success('Cliente eliminado correctamente', 'Operación Completada');
      this._loadData();
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

      const res = await this._customerApiService.getAll(this.filters).toPromise();

      res.data = res.data.map(customer => {
        return new Customer(customer);
      });

      if (onLoadMore) {
        this.list = {
          ...res,
          data: this.list.data.concat(res.data as Array<Customer>)
        };
      } else {
        this.list = res as IPaginationData<Customer>;
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
