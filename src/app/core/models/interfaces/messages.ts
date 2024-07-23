export interface IMessages {
  content:string;
  role:RoleMessage;
}

export type RoleMessage = 'User' | 'Bot';
export type TypeChat = 'GenerateInterview' | 'ResponseInterview';
