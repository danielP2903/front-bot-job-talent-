import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGenerateQuestionInterview } from '../../models/requests/generate-interview';
import { environment } from '../../../../environments/environment';
import { Endpoints,  } from '../../../shared/constants/endpoints';
import { Observable, Subject } from 'rxjs';
import { TypeChat } from '../../models/interfaces/messages';
import { IResponseBase } from '../../models/responses/response.base';
import { IResponseQuestion } from '../../models/responses/response-question';
import { IGenerateResultInterview } from '../../models/requests/generate-result-interview';
import { IResponseInterview } from '../../models/responses/response-result-interview';

@Injectable({
  providedIn: 'root'
})
export class GenerateInterviewService {
  private roleChat = new Subject<TypeChat>();
  constructor(private readonly http:HttpClient) { }

  getQuestionsInterview(interview:IGenerateQuestionInterview):Observable<IResponseBase<IResponseQuestion>> {
    return this.http.post<IResponseBase<IResponseQuestion>>(environment.baseUrlApi + Endpoints.generatorQuestions, interview)
  }

  setRoleChat(value:TypeChat){
    this.roleChat.next(value);
  }

  getRoleChat() {
    return this.roleChat.asObservable();
  }

  getResultInterview(body:IGenerateResultInterview):Observable<IResponseBase<IResponseInterview>>{
    return this.http.post<IResponseBase<IResponseInterview>>(environment.baseUrlApi + Endpoints.resultInterview, body);
  }
}
