import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { StudentSubjectsStore } from '@core/services/student-subjects-store';

@Component({
  selector: 'app-mostrar-subjects-student',
  imports: [],
  templateUrl: './mostrar-subjects-student.html',
  styleUrl: './mostrar-subjects-student.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MostrarSubjectsStudent { 
  private readonly store = inject(StudentSubjectsStore);
  subjects = this.store.subjects;
  loading = this.store.loading; 
  hasSubjects = this.store.hasSubjects;

}
