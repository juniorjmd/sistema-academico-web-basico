import { ChangeDetectionStrategy, Component, computed, inject, signal, OnInit, effect, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectModel } from '@core/models/subject.model';
import { StudentSubjectsStore } from '@core/services/student-subjects-store';
import { SubjectsStore } from '@core/services/subject-store';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-assign-subjects-student',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule,],
  templateUrl: './assign-subjects-student.html',
  styleUrls: ['./assign-subjects-student.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignSubjectsStudent implements OnInit {

  private readonly StudentServicestore = inject(StudentSubjectsStore);
  private readonly subjectStore = inject(SubjectsStore);

  loadingUser = this.StudentServicestore.loading;
  errorStudent = this.StudentServicestore.error;
  savedUser = this.StudentServicestore.saved;
  assignedSubjects = this.StudentServicestore.subjects;
  loadSubjects = this.subjectStore.loading;
  allSubjects = this.subjectStore.subjects;


  private readonly dialogRef = inject(MatDialogRef<AssignSubjectsStudent>);

  selectedIds = signal<number[]>([]);

  constructor() {
    effect(() => {
      if (this.savedUser()) {
        Swal.fire({
          icon: 'success',
          title: 'Materias asignadas',
          text: 'Las materias fueron guardadas correctamente',
          timer: 1500,
          showConfirmButton: false,
          allowOutsideClick: false,
        }).then(() => {
          this.closeModal();
        });
      }
    });
  }
  maxReached = computed(() =>
    this.selectedIds().length > 3
  );



  private getSelectedSubjects(): SubjectModel[] {
    return this.allSubjects().filter(s =>
      this.selectedIds().includes(s.id)
    );
  }

  duplicatedProfessor = computed(() => {
    const selected = this.getSelectedSubjects();
    const professors = selected.map(s => s.professorId);
    const p = [...new Set(professors)];
    console.log({ professors, p })
    return p.length !== professors.length;
  });
  canSave = computed(() =>
    !this.maxReached() && !this.duplicatedProfessor()
  );

  save() {


    if (!this.hasRealChanges()) {
      this.closeModal();
      return;
    }
    if (!this.canSave()) return;
    const subjectIds = this.selectedIds();

    this.StudentServicestore.saveSubjects(subjectIds);
  }

  closeModal() {
    this.selectedIds.set([]);
    this.dialogRef.close(true);

  }

  isChecked(id: number): boolean {
    return this.selectedIds().includes(id);
  }

  toggle(subjectId: number) {
    this.selectedIds.update(ids =>
      ids.includes(subjectId)
        ? ids.filter(id => id !== subjectId)
        : [...ids, subjectId]
    );
  }

  private hasRealChanges(): boolean {
    const originalIds = this.assignedSubjects().map(s => s.id).sort();
    const currentIds = [...this.selectedIds()].sort();

    if (originalIds.length !== currentIds.length) {
      return true;
    }

    return !originalIds.every((id, index) => id === currentIds[index]);
  }
  ngOnInit() {
    this.StudentServicestore.resetSaved();
    this.subjectStore.load();

    const assignedIds = this.assignedSubjects().map(s => s.id);
    this.selectedIds.set(assignedIds);
  }

}
