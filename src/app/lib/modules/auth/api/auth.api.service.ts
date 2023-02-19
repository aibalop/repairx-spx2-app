import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from 'src/app/lib/core/services/http-client.service';
import { IUser } from '../../users/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private _resource = 'v1/auth'

  constructor(private httpClientService: HttpClientService) { }

  signIn(username: string, password: string): Observable<{
    message: string,
    token: string,
    user: IUser
  }> {
    return this.httpClientService.post(`${this._resource}`, { username, password });
  }

  changePassword(username: string, currentPassword: string, newPassword: string): Observable<void> {
    return this.httpClientService.put(`${this._resource}/password`, { username, currentPassword, newPassword });
  }

}
