import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EDateFilterOption } from 'src/app/lib/core/enums/helpers-emuns.enum';
import { IFilterGeneric } from 'src/app/lib/core/interfaces/filter-generic.interface';
import { DatesHelper } from 'src/app/lib/core/utils/dates-helper.util';

@Component({
  selector: 'app-filter-date-select',
  templateUrl: './filter-date-select.component.html',
  styleUrls: ['./filter-date-select.component.scss'],
})
export class FilterDateSelectComponent implements OnInit {

  @Input() label: string = 'Fecha';

  @Input() filters: IFilterGeneric;

  @Input() hideDefault: boolean = false;

  @Output() dateChange: EventEmitter<IFilterGeneric> = new EventEmitter();

  dateFilterOption = EDateFilterOption;

  constructor() { }

  ngOnInit() { }

  async onDateChange(): | Promise<void> {

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
      case EDateFilterOption.CURRENT_YEAR:
        const currentYear = DatesHelper.getTimeRangeForCurrentYear();
        this.filters.fromDate = currentYear.fromDate;
        this.filters.toDate = currentYear.toDate;
        break;
    }

    this.dateChange.emit(this.filters);

  }

}
