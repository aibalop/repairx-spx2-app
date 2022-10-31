import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { IFilterGeneric } from 'src/app/lib/core/interfaces/filter-generic.interface';
import { IPaginationData } from 'src/app/lib/core/interfaces/pagination-data.interface';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { ChargeApiService } from 'src/app/lib/modules/catalogs/charges/api/charge.api.service';
import { ICharge } from 'src/app/lib/modules/catalogs/charges/interfaces/charge.interface';

@Component({
  selector: 'app-search-charge-modal',
  templateUrl: './search-charge-modal.component.html',
  styleUrls: ['./search-charge-modal.component.scss'],
})
export class SearchChargeModalComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  list: IPaginationData<ICharge>;

  filters: IFilterGeneric = {
    searchText: '',
    limit: 20,
    page: 1
  };

  constructor(
    private _modalController: ModalController,
    private _alertDialogService: AlertDialogService,
    private _chargeApiService: ChargeApiService
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

      const res = await this._chargeApiService.getAll(this.filters).toPromise();

      if (onLoadMore) {
        this.list = {
          ...res,
          data: this.list.data.concat(res.data)
        };
      } else {
        this.list = res;
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

  onSelect(charge: ICharge): void {
    this._modalController.dismiss(charge);
  }

}
