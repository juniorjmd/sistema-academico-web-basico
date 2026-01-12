import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Auth } from '@layouts/auth/auth';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '@core/services/student.service';
import { StudentAuthService } from '@core/services/student-auth.service';

@Component({
  selector: 'app-login-student',
  imports: [Auth, CommonModule,ReactiveFormsModule ],
  templateUrl: './loginStudent.html',
  styleUrl: './loginStudent.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginStudent { 
  
  fb = inject(FormBuilder);
  router = inject(Router);
  studentService = inject(StudentService);
  studentAuthService = inject(StudentAuthService);
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });
 

  submit() {
    if (this.form.invalid) return;
    
    this.studentService.LoginStudent(this.form.value.email! ).subscribe({next: (response) => {
      this.studentAuthService.setSession(response.token, response.student);
      this.router.navigateByUrl('/estudiante');
    } , error: (err) => {
      console.error('Error al iniciar sesión:', err);
       if (err.status === 404) {
            this.router.navigateByUrl('/new-student');
          }
  }});

    console.log('Login estudiante:', this.form.value.email);
  
  }
}
