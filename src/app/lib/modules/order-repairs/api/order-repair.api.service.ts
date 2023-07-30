import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterGeneric } from 'src/app/lib/core/interfaces/filter-generic.interface';
import { IPaginationData } from 'src/app/lib/core/interfaces/pagination-data.interface';
import { HttpClientService } from 'src/app/lib/core/services/http-client.service';
import { IOrderRepair, IOrderRepairReport } from '../interfaces/order-repair.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderRepairApiService {

  private _resource = 'v1/order-repairs';

  constructor(private httpClientService: HttpClientService) {
  }

  getAll(filters: IFilterGeneric): Observable<IPaginationData<IOrderRepair>> {
    return this.httpClientService.get(`${this._resource}/`, filters);
  }

  getReport(filters: IFilterGeneric): Observable<IOrderRepairReport> {
    return this.httpClientService.get(`${this._resource}/report`, filters);
  }

  getById(_id: string): Observable<IOrderRepair> {
    return this.httpClientService.get(`${this._resource}/${_id}`);
  }

  getPDFByOrderId(orderId: string): Observable<Blob> {
    return this.httpClientService.getStream(`${this._resource}/order-id/${orderId}/pdf`);
  }

  getByOrderId(orderId: string): Observable<IOrderRepair> {
    return this.httpClientService.get(`${this._resource}/order-id/${orderId}`);
  }

  create(data: IOrderRepair): Observable<IOrderRepair> {
    return this.httpClientService.post(`${this._resource}`, data);
  }

  update(_id: string, data: IOrderRepair): Observable<IOrderRepair> {
    return this.httpClientService.put(`${this._resource}/${_id}`, data);
  }

  updateStatusPayment(_id: string, paidAt: Date): Observable<void> {
    return this.httpClientService.put(`${this._resource}/${_id}/payment`, {
      isPaid: true,
      remainingAmount: 0,
      paidAt
    });
  }

  updateStatus(_id: string, status: string): Observable<void> {
    return this.httpClientService.put(`${this._resource}/${_id}/status`, { status });
  }

  updateDeviceStatus(_id: string, index: number, status: string): Observable<void> {
    return this.httpClientService.put(`${this._resource}/${_id}/status-device`, {
      index,
      status,
    });
  }

  delete(_id: string): Observable<any> {
    return this.httpClientService.delete(`${this._resource}/${_id}`);
  }

}
