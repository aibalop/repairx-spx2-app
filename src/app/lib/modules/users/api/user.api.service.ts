import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from 'src/app/lib/core/services/http-client.service';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private _resource = 'v1/users'

  constructor(private httpClientService: HttpClientService) { }

  getAll(query: any = {}): Observable<Array<IUser>> {
    return this.httpClientService.get(`${this._resource}`, query);
  }

  create(data: IUser): Observable<IUser> {
    return this.httpClientService.post(`${this._resource}`, data);
  }

}
