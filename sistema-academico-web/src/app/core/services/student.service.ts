import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';  
import { StudentLoginResponse } from '@core/models/StudentLoginResponse';
import { firstValueFrom } from 'rxjs'; 
import { SubjectModel } from '@core/models/subject.model';
import { StudentPartners } from '@core/models/student-partners';
@Injectable({
  providedIn: 'root'
})
export class StudentService { 
 
  private readonly url = 'https://localhost:7093/api/students';
  private readonly http = inject(HttpClient);
  constructor() { }
 
  LoginStudent(email: string) {
   return this.http.post<StudentLoginResponse>(`${this.url}/login`, { email })  
}

  create(student: { name: string; email: string ;  subjectIds : number[] }): Promise<void> {
    return firstValueFrom(   this.http.post<void>(this.url, student)  );
  }

  getStudentSubjects(id: number) {
    return this.http.get<SubjectModel[]>(`${this.url}/${id}/subjects`);
  } 
  getStudentPartners(id: number) {
    return this.http.get<StudentPartners[]>(`${this.url}/${id}/partners`);
  } 

cargarSubjects(student: {  id: number;name:string;email:string;  subjectIds: number[];}) {
  return this.http.post<void>(
    `${this.url}/cargar-subjects`,    student
  );
}


}
