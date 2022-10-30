import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { IFilterGeneric } from 'src/app/lib/core/interfaces/filter-generic.interface';
import { IPaginationData } from 'src/app/lib/core/interfaces/pagination-data.interface';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { WorkApiService } from 'src/app/lib/modules/catalogs/works/api/work.api.service';
import { IWork } from 'src/app/lib/modules/catalogs/works/interfaces/work.interface';

@Component({
  selector: 'app-search-work-modal',
  templateUrl: './search-work-modal.component.html',
  styleUrls: ['./search-work-modal.component.scss'],
})
export class SearchWorkModalComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  list: IPaginationData<IWork>;

  filters: IFilterGeneric = {
    searchText: '',
    limit: 20,
    page: 1
  };

  constructor(
    private _modalController: ModalController,
    private _alertDialogService: AlertDialogService,
    private _workApiService: WorkApiService
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

      const res = await this._workApiService.getAll(this.filters).toPromise();

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

  onSelect(work: IWork): void {
    this._modalController.dismiss(work);
  }

}
