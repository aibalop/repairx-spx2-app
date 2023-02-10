import {Component, Input, OnInit} from '@angular/core';
import {EOrderRepairStatus} from '../../../../../core/enums/status.enum';
import {IFilterGeneric} from '../../../../../core/interfaces/filter-generic.interface';
import {PopoverController} from "@ionic/angular";

@Component({
  selector: 'app-filter-options-order-repair-popover',
  templateUrl: './filter-options-order-repair-popover.component.html',
  styleUrls: ['./filter-options-order-repair-popover.component.scss'],
})
export class FilterOptionsOrderRepairPopoverComponent implements OnInit {
  @Input() filters: IFilterGeneric;
  orderRepairStatus = EOrderRepairStatus;

  constructor(private _popoverController: PopoverController) {
  }

  ngOnInit() {
  }

  onFiltersChange(): void {
    if (this.filters.status.length === 0) {
      this.filters.status.push(EOrderRepairStatus.PENDING);
    }
    console.log(this.filters);
    this._popoverController.dismiss(this.filters);
  }
}
