import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { StudentService } from '@core/services/student.service';
import { Auth } from '@layouts/auth/auth';
import express from 'express';

@Component({
  selector: 'app-student-create',
  imports: [Auth, CommonModule,ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, 
})
export class Create { 
  private readonly router = inject(Router);
  fb = inject(FormBuilder);
  readonly #studentService =  inject(StudentService)
 form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });
 

  submit() {
    if (this.form.invalid) return;

    this.#studentService.create({
      name: this.form.value.name!,
      email: this.form.value.email! , 
      subjectIds: []
    }).then(() => {
       
      Swal.fire({
        icon: 'success',
        title: 'Estudiante creado con éxito',
        showConfirmButton: false,
        timer: 1500
      });
      this.form.reset();
      setTimeout(() => {        
        this.router.navigate(['/students/login']);
      }, 1000); 
      
      
    }).catch((error) => { 
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el estudiante',
        text: error.message || 'Ha ocurrido un error inesperado',
        timer: 1500, showConfirmButton: false
      });
    });

    
  }
}
