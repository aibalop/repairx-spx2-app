import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { EOrderRepairsRoutes } from 'src/app/lib/core/enums/modules-routes.enum';
import { ToastService } from 'src/app/lib/core/services/toast.service';
import { OrderRepairApiService } from 'src/app/lib/modules/order-repairs/api/order-repair.api.service';
import { UserMenuPopoverComponent } from '../../components/popovers/user-menu-popover/user-menu-popover.component';

@Component({
  selector: 'app-main-header-layout',
  templateUrl: './main-header-layout.component.html',
  styleUrls: ['./main-header-layout.component.scss'],
})
export class MainHeaderLayoutComponent implements OnInit {

  showSearchbar: boolean = false;

  isSearching: boolean = false;

  constructor(
    private _popoverController: PopoverController,
    private _router: Router,
    private _orderRepairApiService: OrderRepairApiService,
    private _toastService: ToastService,
  ) { }

  ngOnInit() { }

  async onOpenUserMenu(e: Event): Promise<void> {
    const popover = await this._popoverController.create({
      component: UserMenuPopoverComponent,
      dismissOnSelect: true,
      showBackdrop: true,
      event: e,
    });

    await popover.present();
  }

  onSearch($event: string): void {
    if ($event && !this.isSearching) {
      this.isSearching = true;
      this._searchOrderRepair($event);
    }
  }

  private async _searchOrderRepair(orderId: string): Promise<void> {

    try {

      const orderRepair = await this._orderRepairApiService.getByOrderId(orderId).toPromise();

      this.showSearchbar = false;

      this.isSearching = false

      this._router.navigate([EOrderRepairsRoutes.ORDER_REPAIRS_VIEW, orderRepair._id]);

    } catch (error) {

      this.isSearching = false

      this._toastService.warning('No se encontraron resultados');

    }

  }

}
