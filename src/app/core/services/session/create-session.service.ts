import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Endpoints } from '../../../shared/constants/endpoints';
import { IResponseBase } from '../../models/responses/response.base';

@Injectable({
  providedIn: 'root'
})
export class CreateSessionService {

  constructor(private readonly http:HttpClient) { }

  createThread():Observable<IResponseBase<string>>{
    return this.http.get<IResponseBase<string>>(environment.baseUrlApi + Endpoints.interviews)
  }
}
