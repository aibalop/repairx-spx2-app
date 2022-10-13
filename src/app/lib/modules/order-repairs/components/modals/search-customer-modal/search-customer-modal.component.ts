import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { IFilterGeneric } from 'src/app/lib/core/interfaces/filter-generic.interface';
import { IPaginationData } from 'src/app/lib/core/interfaces/pagination-data.interface';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { CustomerApiService } from 'src/app/lib/modules/customers/api/customer.api.service';
import { Customer } from 'src/app/lib/modules/customers/models/customer.model';

@Component({
  selector: 'app-search-customer-modal',
  templateUrl: './search-customer-modal.component.html',
  styleUrls: ['./search-customer-modal.component.scss'],
})
export class SearchCustomerModalComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  list: IPaginationData<Customer>;

  filters: IFilterGeneric = {
    searchText: '',
    limit: 20,
    page: 1
  };

  constructor(
    private _modalController: ModalController,
    private _alertDialogService: AlertDialogService,
    private _customerApiService: CustomerApiService
  ) { }

  ngOnInit() {
    this._loadData();
  }

  onSearch($event: string): void {
    this.filters.searchText = $event;
    this._loadData();
  }

  doInfinite(event: any): void {
    this._loadData(true, event);
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

  onSelect(customer: Customer): void {
    this._modalController.dismiss(customer);
  }

}
