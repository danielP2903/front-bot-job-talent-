import { Interview } from "../requests/generate-result-interview";

export interface IResponseReportsInterview {
  _id:string;
  idInterview:string;
  interview:Interview[];
  presenter:{email:string,names:string};
  qualification:string;
  comments:string;
  feedback:string;
  user:{idRecruitment:string, email:string}
}
