import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterGeneric } from 'src/app/lib/core/interfaces/filter-generic.interface';
import { IPaginationData } from 'src/app/lib/core/interfaces/pagination-data.interface';
import { HttpClientService } from 'src/app/lib/core/services/http-client.service';
import { IDevice } from '../interfaces/device.interface';

@Injectable({
  providedIn: 'root'
})
export class DeviceApiService {

  private _resource = 'v1/devices';

  constructor(private httpClientService: HttpClientService) { }

  getAll(filters: IFilterGeneric): Observable<IPaginationData<IDevice>> {
    return this.httpClientService.get(`${this._resource}/`, filters);
  }

  getById(_id: string): Observable<IDevice> {
    return this.httpClientService.get(`${this._resource}/${_id}`);
  }

  create(data: IDevice): Observable<IDevice> {
    return this.httpClientService.post(`${this._resource}`, data);
  }

  update(_id: string, data: IDevice): Observable<IDevice> {
    return this.httpClientService.put(`${this._resource}/${_id}`, data);
  }

  delete(_id: string): Observable<any> {
    return this.httpClientService.delete(`${this._resource}/${_id}`);
  }

}
