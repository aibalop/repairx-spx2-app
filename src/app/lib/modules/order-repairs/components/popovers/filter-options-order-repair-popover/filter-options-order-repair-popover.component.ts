import { Component, Input, OnInit } from '@angular/core';
import { EOrderRepairStatus } from '../../../../../core/enums/status.enum';
import { IFilterGeneric } from '../../../../../core/interfaces/filter-generic.interface';
import { PopoverController } from "@ionic/angular";
import { DatesHelper } from 'src/app/lib/core/utils/dates-helper.util';
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

  async onFiltersChange(): |Promise<void> {
    if (this.filters.status.length === 0) {
      this.filters.status.push(EOrderRepairStatus.PENDING);
    }
    switch (this.filters.dateFilterOption) {
      case EDateFilterOption.DEFAULT:
        delete this.filters.fromDate;
        delete this.filters.toDate;
        break;
      case EDateFilterOption.CURRENT_MONTH:
        const currentMonth = DatesHelper.getTimeRangeForCurrentMonth();
        this.filters.fromDate = currentMonth.fromDate;
        this.filters.toDate = currentMonth.toDate;
        break;
      case EDateFilterOption.TWO_MONTHS_AGO:
        const twoMonthsAgo = DatesHelper.getTimeRangeForTwoMonthsAgo();
        this.filters.fromDate = twoMonthsAgo.fromDate;
        this.filters.toDate = twoMonthsAgo.toDate;
        break;
      case EDateFilterOption.SIX_MONTHS_AGO:
        const sixMonthsAgo = DatesHelper.getTimeRangeForTwoSixMonthsAgo();
        this.filters.fromDate = sixMonthsAgo.fromDate;
        this.filters.toDate = sixMonthsAgo.toDate;
        break;
    }
    this._popoverController.dismiss(this.filters);
  }
}
