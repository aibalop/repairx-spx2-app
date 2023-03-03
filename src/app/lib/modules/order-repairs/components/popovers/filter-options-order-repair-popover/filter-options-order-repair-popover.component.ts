import { Component, Input, OnInit } from '@angular/core';
import { EOrderRepairStatus } from '../../../../../core/enums/status.enum';
import { IFilterGeneric } from '../../../../../core/interfaces/filter-generic.interface';
import { PopoverController } from "@ionic/angular";
import { EDateFilterOption } from 'src/app/lib/core/enums/helpers-emuns.enum';

@Component({
  selector: 'app-filter-options-order-repair-popover',
  templateUrl: './filter-options-order-repair-popover.component.html',
  styleUrls: ['./filter-options-order-repair-popover.component.scss'],
})
export class FilterOptionsOrderRepairPopoverComponent implements OnInit {

  @Input() filters: IFilterGeneric;

  orderRepairStatus = EOrderRepairStatus;

  dateFilterOption = EDateFilterOption;

  constructor(private _popoverController: PopoverController) { }

  ngOnInit() { }

  async onFiltersChange(): Promise<void> {

    if (this.filters.status.length === 0) {
      this.filters.status.push(EOrderRepairStatus.PENDING);
    }

    this._popoverController.dismiss(this.filters);

  }

  onDateChange(updatedFilters: IFilterGeneric): void {

    this.filters = updatedFilters;

    this.onFiltersChange();

  }

}
