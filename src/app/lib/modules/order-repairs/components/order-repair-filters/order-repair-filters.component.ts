import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {
  FilterOptionsOrderRepairPopoverComponent
} from '../popovers/filter-options-order-repair-popover/filter-options-order-repair-popover.component';
import {IFilterGeneric} from '../../../../core/interfaces/filter-generic.interface';

@Component({
  selector: 'app-order-repair-filters',
  templateUrl: './order-repair-filters.component.html',
  styleUrls: ['./order-repair-filters.component.scss'],
})
export class OrderRepairFiltersComponent implements OnInit {
  @Output() refresh = new EventEmitter<IFilterGeneric>();
  @Input() filters: IFilterGeneric;

  constructor(private popoverController: PopoverController) {
  }

  ngOnInit() {
  }

  async onOpenFilterOptions(e: Event): Promise<void> {
    const popover = await this.popoverController.create({
      component: FilterOptionsOrderRepairPopoverComponent,
      componentProps: {
        filters: this.filters,
      },
      dismissOnSelect: false,
      showBackdrop: true,
      event: e,
    });

    await popover.present();

    const {data} = await popover.onDidDismiss();

    if (!data) {
      return;
    }

    console.log('received from popover menu filter: ', data);
    this.refresh.emit(data);

  }

}
