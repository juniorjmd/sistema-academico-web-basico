export interface SubjectModel {
  id: number;
  name: string;
  credits: number;
  professorId?: number;
  professorName?: string;
}
