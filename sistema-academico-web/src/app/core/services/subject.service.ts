import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { SubjectModel } from '@core/models/subject.model'; 

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
 
 
  private readonly url = 'https://localhost:7093/api/subjects';
  private readonly http = inject(HttpClient);

  getAll() {
    return this.http.get<SubjectModel[]>(this.url);
  }
}

 
