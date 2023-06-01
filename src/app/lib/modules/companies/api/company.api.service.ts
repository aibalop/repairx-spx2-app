import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from 'src/app/lib/core/services/http-client.service';
import { ICompany } from '../interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyApiService {

  private _resource = 'v1/companies';

  constructor(private httpClientService: HttpClientService) { }

  getById(_id: string): Observable<ICompany> {
    return this.httpClientService.get(`${this._resource}/${_id}`);
  }

  update(_id: string, data: ICompany): Observable<ICompany> {
    return this.httpClientService.put(`${this._resource}/${_id}`, data);
  }

}
