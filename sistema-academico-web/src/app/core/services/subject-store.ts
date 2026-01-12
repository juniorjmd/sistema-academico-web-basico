import { Injectable, inject, signal } from '@angular/core';
import { SubjectModel } from '@core/models/subject.model';
import { SubjectService } from './subject.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectsStore {

  private readonly service = inject(SubjectService);

  private readonly _subjects = signal<SubjectModel[]>([]);
  private readonly _loading = signal(false);

  subjects = this._subjects.asReadonly();
  loading = this._loading.asReadonly();

  load() {
    this._loading.set(true);

    this.service.getAll().subscribe({
      next: subjects => {
        this._subjects.set(subjects), 
        console.log(subjects)
      
      },
      error: () => this._subjects.set([]),
      complete: () => this._loading.set(false),
    });
  }

  clear() {
    this._subjects.set([]);
  }
}
