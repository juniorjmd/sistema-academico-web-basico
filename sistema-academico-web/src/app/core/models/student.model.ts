import { SubjectModel } from "./subject.model";

export interface StudentModel {
 
  id: number;
  name: string;
  email: string;  
  subjectIds?: number[];
  subjects?: SubjectModel[];
}
