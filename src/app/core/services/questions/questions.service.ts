import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISaveInterview } from '../../models/requests/save-interview';
import { Observable } from 'rxjs';
import { IResponseBase } from '../../models/responses/response.base';
import { environment } from '../../../../environments/environment';
import { Endpoints } from '../../../shared/constants/endpoints';
import { IResponseInterviews } from '../../models/responses/response-interviews';
import { IResponseReportsInterview } from '../../models/responses/response-reportinterview';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private readonly http:HttpClient) { }

  saveQuestions(body:ISaveInterview):Observable<IResponseBase<any>>{
    return this.http.post<IResponseBase<any>>(environment.baseUrlApi + Endpoints.questions, body)
  }

  getQuestionsInterview(skip:number,limit:number):Observable<IResponseBase<IResponseInterviews[]>>{
    const params = new HttpParams().set('skip',skip).set('limit',limit)
    return this.http.get<IResponseBase<IResponseInterviews[]>>(environment.baseUrlApi + Endpoints.questions, {params});
  }

  generateCodeInterview(idInterview:string):Observable<IResponseBase<string>> {
    const params = new HttpParams().set('interview',idInterview);
    return this.http.get<IResponseBase<string>>(environment.baseUrlApi + Endpoints.generateCode, {params});

  }

  validateCodeInterview(code:string):Observable<IResponseBase<IResponseInterviews>>{
    const params = new HttpParams().set('codeInterview',code);
    return this.http.get<IResponseBase<IResponseInterviews>>(environment.baseUrlApi + Endpoints.validateCode, {params});

  }

  getReportInterview(identifier:string,skip:number,limit:number):Observable<IResponseBase<IResponseReportsInterview[]>> {
    const params = new HttpParams().set('skip',skip).set('limit',limit).set('identifier',identifier)
    return this.http.get<IResponseBase<IResponseReportsInterview[]>>(environment.baseUrlApi + Endpoints.reportInterview, {params});

  }

  generateReportPdf(identifier:string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Accept': 'application/pdf'
    });
    const params = new HttpParams().set('identifier',identifier)

    return this.http.get(environment.baseUrlApi + Endpoints.dowloadPdf, {
      headers,
      params,
      responseType: 'blob'
    });
  }
}
