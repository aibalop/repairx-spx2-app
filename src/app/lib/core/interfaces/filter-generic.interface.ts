export interface IFilterGeneric {
  searchText?: string;
  status?: Array<string>;
  isPaid?: 'both' | 'true' | 'false';
  fromDate?: number;
  toDate?: number;
  timeZone?: number;
  dateFilterOption?: string;
  limit?: number;
  page?: number;
}
