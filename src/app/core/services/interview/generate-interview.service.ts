import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGenerateQuestionInterview } from '../../models/requests/generate-interview';
import { environment } from '../../../../environments/environment';
import { Endpoints, questions_dummy } from '../../../shared/constants/endpoints';
import { of, Subject } from 'rxjs';
import { TypeChat } from '../../models/interfaces/messages';

@Injectable({
  providedIn: 'root'
})
export class GenerateInterviewService {
  private roleChat = new Subject<TypeChat>();
  constructor(private readonly http:HttpClient) { }

  getQuestionsInterview(interview:IGenerateQuestionInterview) {
    return of(questions_dummy);
    // return this.http.post(environment.baseUrlApi + Endpoints.interviews, interview)
  }

  setRoleChat(value:TypeChat){
    this.roleChat.next(value);
  }

  getRoleChat() {
    return this.roleChat.asObservable();
  }
}
