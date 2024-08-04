
export interface IResponseBase<T> {
  message:string;
  data:T;
  statusCode:number;
  ok:boolean
}
