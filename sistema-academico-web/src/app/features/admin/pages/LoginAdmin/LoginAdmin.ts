import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from "@layouts/auth/auth";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-admin',
  imports: [CommonModule, ReactiveFormsModule, Auth],
  templateUrl: './LoginAdmin.html',
  styleUrl: './LoginAdmin.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginAdmin { 

  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });
 

  submit() {
    if (this.form.invalid) return;
    Swal.fire({
      icon: 'success',
      title: 'Login en proceso de creacion, gracias por su paciencia',
      showConfirmButton: false,
      timer: 1500
    });
    console.log('Login estudiante:', this.form.value.email);
  }

}
