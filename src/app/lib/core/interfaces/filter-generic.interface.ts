export interface IFilterGeneric {
  searchText?: string;
  status?: Array<string>;
  isPaid?: string;
  fromDate?: number;
  toDate?: number;
  timeZone?: number;
  dateFilterOption?: string;
  limit?: number;
  page?: number;
}
