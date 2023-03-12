import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterGeneric } from 'src/app/lib/core/interfaces/filter-generic.interface';
import { HttpClientService } from 'src/app/lib/core/services/http-client.service';

export type SummaryData = {
  revenue: number,
  totalOrderRepairs: number,
  totalNewCustomers: number,
};

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {

  private _resource = 'v1/dashboard';

  constructor(private httpClientService: HttpClientService) {
  }

  getSummary(filters: IFilterGeneric): Observable<SummaryData> {
    return this.httpClientService.get(`${this._resource}/summary`, filters);
  }

}
