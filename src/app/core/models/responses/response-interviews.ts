export interface IResponseInterviews {
  _id:string;
  user:{idRecruitment:string,email:string};
  questions:string[];
  description:string;
  requirements:string;
  titleVacancy:string;
  dateCreation:string;
}
