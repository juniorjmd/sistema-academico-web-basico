import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { StudentModel } from '@core/models/student.model'; 
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class StudentAuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly _token = signal<string | null>(
    this.safeGet('token')
  );
  private readonly url = 'https://localhost:7093/api/students';
  private readonly http = inject(HttpClient);
  constructor() { }


  private readonly _student = signal<StudentModel | null>(
   this.safeGetJson<StudentModel>('student')
  );

  token = this._token.asReadonly();
  student = this._student.asReadonly();

  isAuthenticated = computed(() => !!this._token());

  private safeGet(key: string): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(key);
  }
  private safeSet(key: string, value: string) {
    if (!this.isBrowser) return;
    localStorage.setItem(key, value);
  }

  private safeRemove(key: string) {
    if (!this.isBrowser) return;
    localStorage.removeItem(key);
  }
  private safeGetJson<T>(key: string): T | null {
    const raw = this.safeGet(key);
    if (!raw) return null;
    try { return JSON.parse(raw) as T; } catch { return null; }
  }

  private safeSetJson(key: string, value: unknown) {
    this.safeSet(key, JSON.stringify(value));
  }
  setSession(token: string, student: StudentModel) {
    this.safeSet('token', token);
    this.safeSetJson('student', student);

    this._token.set(token);
    this._student.set(student);
  }

  logout() {
    this.safeRemove('token');
    this.safeRemove('student');

    this._token.set(null);
    this._student.set(null);
  }
 
}
