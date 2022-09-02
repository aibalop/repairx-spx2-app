import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { IFilterGeneric } from 'src/app/lib/core/interfaces/filter-generic.interface';
import { IPaginationData } from 'src/app/lib/core/interfaces/pagination-data.interface';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { ToastService } from 'src/app/lib/core/services/toast.service';
import { ChargeApiService } from '../../api/charge.api.service';
import { ChargeFormModalComponent } from '../../components/modals/charge-form-modal/charge-form-modal.component';
import { ICharge } from '../../interfaces/charge.interface';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.page.html',
  styleUrls: ['./charges.page.scss'],
})
export class ChargesPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  list: IPaginationData<ICharge>;

  filters: IFilterGeneric = {
    searchText: '',
    limit: 20,
    page: 1
  };

  constructor(
    private _modalController: ModalController,
    private _chargeApiService: ChargeApiService,
    private _alertDialogService: AlertDialogService,
    private _toastService: ToastService
  ) { }

  ngOnInit() {
    this._loadData();
  }

  async onOpenFormModal(_id: string = '', isView: boolean = false): Promise<void> {

    const formModal = await this._modalController.create({
      component: ChargeFormModalComponent,
      breakpoints: [0.25, 0.5, 0.75],
      initialBreakpoint: 0.75,
      backdropDismiss: false,
      componentProps: {
        chargeId: _id,
        isEdit: _id ? true : false,
        isView
      }
    });

    await formModal.present();

    const { data } = await formModal.onDidDismiss();

    if (data) {
      this._loadData();
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
      const isConfirm = await this._alertDialogService.confirm('Confirmar', '¿Desea eliminar el cargo?');

      if (!isConfirm) {
        return;
      }

      await this._chargeApiService.delete(_id).toPromise();
      this._toastService.success('Cargo eliminado correctamente', 'Operación Completada');
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

}
