import { SubjectModel } from "./subject.model";

export interface StudentPartners {

    id:number;
    name: string;
    sharedSubjects:SubjectModel[]
 }
