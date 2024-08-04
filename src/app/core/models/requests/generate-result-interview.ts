export interface IGenerateResultInterview {
  response:string;
  threadId:string;
  assistant:string;
  interview:Interview[];
  codeInterview:string;
  names:string;
  email:string;
}

export interface Interview {
  question:string;
  response:string
}
