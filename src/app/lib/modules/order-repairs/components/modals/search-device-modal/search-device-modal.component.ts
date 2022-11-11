import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { IFilterGeneric } from 'src/app/lib/core/interfaces/filter-generic.interface';
import { IPaginationData } from 'src/app/lib/core/interfaces/pagination-data.interface';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { DeviceApiService } from '../../../api/device.api.service';
import { IDevice } from '../../../interfaces/device.interface';

@Component({
  selector: 'app-search-device-modal',
  templateUrl: './search-device-modal.component.html',
  styleUrls: ['./search-device-modal.component.scss'],
})
export class SearchDeviceModalComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  list: IPaginationData<IDevice>;

  filters: IFilterGeneric = {
    searchText: '',
    limit: 20,
    page: 1
  };

  constructor(
    private _modalController: ModalController,
    private _alertDialogService: AlertDialogService,
    private _deviceApiService: DeviceApiService
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

      const res = await this._deviceApiService.getAll(this.filters).toPromise();

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

  onSelect(device: IDevice): void {
    this._modalController.dismiss(device);
  }

}
