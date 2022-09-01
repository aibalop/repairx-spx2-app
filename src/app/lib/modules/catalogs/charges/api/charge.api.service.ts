import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterGeneric } from 'src/app/lib/core/interfaces/filter-generic.interface';
import { IPaginationData } from 'src/app/lib/core/interfaces/pagination-data.interface';
import { HttpClientService } from 'src/app/lib/core/services/http-client.service';
import { ICharge } from '../interfaces/charge.interface';

@Injectable({
  providedIn: 'root'
})
export class ChargeApiService {

  private _resource = 'v1/charges';

  constructor(private httpClientService: HttpClientService) { }

  getAll(filters: IFilterGeneric): Observable<IPaginationData<ICharge>> {
    return this.httpClientService.get(`${this._resource}/`, filters);
  }

  getById(_id: string): Observable<ICharge> {
    return this.httpClientService.get(`${this._resource}/${_id}`);
  }

  create(data: ICharge): Observable<ICharge> {
    return this.httpClientService.post(`${this._resource}`, data);
  }

  update(_id: string, data: ICharge): Observable<ICharge> {
    return this.httpClientService.put(`${this._resource}/${_id}`, data);
  }

  delete(_id: string): Observable<any> {
    return this.httpClientService.delete(`${this._resource}/${_id}`);
  }

}
