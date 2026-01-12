import { inject, Injectable, signal } from '@angular/core';
import { StudentService } from './student.service';
import { StudentPartners } from '@core/models/student-partners';
import { StudentAuthService } from './student-auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentPartnersStore {

  studentService = inject(StudentService);
  authService = inject(StudentAuthService);

  readonly #_loadParners = signal<boolean>(false);
  readonly #_partners = signal<StudentPartners[]>([]);
  readonly #_error = signal<string | null>(null);
  public error = this.#_error.asReadonly();
  public loading = this.#_loadParners.asReadonly();
  public partners = this.#_partners.asReadonly();

  loadCurrentStudentParners() {

    if (!this.authService.isAuthenticated()) return;
    const student = this.authService.student();
    if (!student) return;
    this.loadStudentPartners(student.id)
  }

  private loadStudentPartners(id: number) {
    this.#_error.set(null)
    this.#_loadParners.set(true);
    this.studentService.getStudentPartners(id).subscribe({
      next: (p) => {
        this.#_partners.set(p);
        this.#_loadParners.set(false);
      },
      error: (err) => {
        this.#_partners.set([]);
        this.#_error.set(
          err?.message ?? 'Error al cargar los compañeros'
        );
        this.#_loadParners.set(false);
      } 
    })
  }

  clear() {
    this.#_partners.set([]);
    this.#_error.set(null);
  }


}
