import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseBase } from '../../models/responses/response.base';
import { IResponseLogin } from '../../models/responses/response-login';
import { environment } from '../../../../environments/environment';
import { Endpoints } from '../../../shared/constants/endpoints';
import { IRegisterRequest } from '../../models/requests/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http:HttpClient) { }

  login(email:string, password:string):Observable<IResponseBase<IResponseLogin>>{
    const dataServices = {
      email,
      password
    }
    return this.http.post<IResponseBase<IResponseLogin>>(environment.baseUrlApi + Endpoints.login, dataServices );
  }

  register(user:IRegisterRequest):Observable<IResponseBase<any>>{
    return this.http.post<IResponseBase<any>>(environment.baseUrlApi + Endpoints.users, user)
  }
}
