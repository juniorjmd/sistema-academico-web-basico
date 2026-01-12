import { computed, inject, Injectable, signal } from '@angular/core';
import { SubjectModel } from '@core/models/subject.model';
import { StudentAuthService } from './student-auth.service';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root'
})
export class StudentSubjectsStore {

  
  private readonly _subjects = signal<SubjectModel[]>([]);
 private readonly authService = inject(StudentAuthService);
 private readonly studentService = inject(StudentService);
  private readonly _loading = signal<boolean>(false);
  private readonly _saved = signal(false);
  private readonly _error = signal<string>("");
  saved =  this._saved.asReadonly();
  error =  this._error.asReadonly();
  loading = this._loading.asReadonly();
  subjects = this._subjects.asReadonly();
  hasSubjects = computed(() => this.subjects().length > 0);

  canAddMore = computed(() => this.subjects().length < 3);
  totalCredits = computed(() =>
    this.subjects().reduce((sum, s) => sum + s.credits, 0)
  );

  resetSaved(){
    this._saved.set(false);
  }

  add(subject: SubjectModel) {
    if (!this.canAddMore()) return;
    this._subjects.update(list => [...list, subject]);
  }

  remove(id: number) {
    this._subjects.update(list => list.filter(s => s.id !== id));
  }

  clear() {
    this._subjects.set([]);
  }

  loadSubjects() {
  const student = this.authService.student();
  if (!student) return;

  this._loading.set(true);

  this.studentService
    .getStudentSubjects(student.id)
    .subscribe({
      next: (subjects) => {this._subjects.set(subjects); console.log({subjects});},
      error: () => {this._subjects.set([]); this._error.set('No se pudieron guardar las materias');},
      complete: () => this._loading.set(false),
    });
}


saveSubjects(subjectIds: number[]) {
  const student = this.authService.student();
  if (!student) return;

  this._loading.set(true);

  this.studentService
    .cargarSubjects({
      id: student.id,
      name: student.name,
      email:student.email,
      subjectIds,
    })
    .subscribe({
      next: () => {
        this.loadSubjects();  
        this._saved.set(true)
      },
      error: () => {
        this._loading.set(false);
      },
      complete: () => {
        this._loading.set(false);
      },
    });
}


}
