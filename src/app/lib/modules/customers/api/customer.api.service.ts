import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterGeneric } from 'src/app/lib/core/interfaces/filter-generic.interface';
import { IPaginationData } from 'src/app/lib/core/interfaces/pagination-data.interface';
import { HttpClientService } from 'src/app/lib/core/services/http-client.service';
import { ICustomer } from '../interfaces/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  private _resource = 'v1/customers';

  constructor(private httpClientService: HttpClientService) { }

  getAll(filters: IFilterGeneric): Observable<IPaginationData<ICustomer>> {
    return this.httpClientService.get(`${this._resource}/`, filters);
  }

  getById(_id: string): Observable<ICustomer> {
    return this.httpClientService.get(`${this._resource}/${_id}`);
  }

  create(data: ICustomer): Observable<ICustomer> {
    return this.httpClientService.post(`${this._resource}`, data);
  }

  update(_id: string, data: ICustomer): Observable<ICustomer> {
    return this.httpClientService.put(`${this._resource}/${_id}`, data);
  }

  delete(_id: string): Observable<any> {
    return this.httpClientService.delete(`${this._resource}/${_id}`);
  }

}
