import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StudentAuthService } from '@core/services/student-auth.service';
import { StudentSubjectsStore } from '@core/services/student-subjects-store';

import { Main } from '@layouts/main/main';
import { MostrarSubjectsStudent } from './components/mostrar-subjects-student/mostrar-subjects-student';
import { AssignSubjectsStudent } from './components/assign-subjects-student/assign-subjects-student';
import { MostrarPartners } from "./components/mostrar-partners/mostrar-partners";
import { StudentPartnersStore } from '@core/services/student-partners-store';

@Component({
  selector: 'app-student-main',
  standalone: true,
  imports: [Main, MostrarSubjectsStudent, MostrarPartners],
  styleUrls: ['./main.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main.html'
})
export class StudentMain implements OnInit {

  private readonly router = inject(Router);
  private readonly auth = inject(StudentAuthService);
  private readonly subjectsStore = inject(StudentSubjectsStore);
  private readonly partnerStore =  inject(StudentPartnersStore)

  dialog = inject(MatDialog)
  student = this.auth.student;
  isAuthenticated = this.auth.isAuthenticated;

  studentName = computed(() =>
    this.student()?.name ?? 'Estudiante'
  );

  ngOnInit() {
    this.subjectsStore.loadSubjects();
  }

  openAssignModal() {
    const d = this.dialog.open<AssignSubjectsStudent, void, boolean>(AssignSubjectsStudent, {
      width: '480px', disableClose: true
    });
    d.afterClosed().subscribe(result => {
      if (result === true) {
        this.subjectsStore.resetSaved();
        this.partnerStore.loadCurrentStudentParners();
      }
    });
  }


  logout() {
    this.auth.logout();
    setTimeout(() => {
      this.router.navigate(['/student/login']);
    }, 1500);
  }
}
