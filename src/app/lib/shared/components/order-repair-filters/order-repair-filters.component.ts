import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import {
  FilterOptionsOrderRepairPopoverComponent
} from '../popovers/filter-options-order-repair-popover/filter-options-order-repair-popover.component';
import { IFilterGeneric } from '../../../core/interfaces/filter-generic.interface';

@Component({
  selector: 'app-order-repair-filters',
  templateUrl: './order-repair-filters.component.html',
  styleUrls: ['./order-repair-filters.component.scss'],
})
export class OrderRepairFiltersComponent implements OnInit {
  @Output() refresh = new EventEmitter<IFilterGeneric>();
  @Input() filters: IFilterGeneric;
  @Input() onlyDateFilter: boolean = false;

  constructor(private _popoverController: PopoverController) {
  }

  ngOnInit() {
  }

  async onOpenFilterOptions(e: Event): Promise<void> {
    const popover = await this._popoverController.create({
      component: FilterOptionsOrderRepairPopoverComponent,
      componentProps: {
        filters: this.filters,
        onlyDateFilter: this.onlyDateFilter,
      },
      dismissOnSelect: false,
      showBackdrop: true,
      event: e,
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();

    if (!data) {
      return;
    }

    this.refresh.emit(data);

  }

}
