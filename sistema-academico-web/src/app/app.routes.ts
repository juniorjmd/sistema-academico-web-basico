import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/students/pages/loginStudent/loginStudent')
                .then(m => m.LoginStudent)
    },
     {
        path: 'new-student',
        loadComponent: () =>
            import('./features/students/pages/create/create')
                .then(m => m.Create)
    },
    {
        path: 'estudiante',
        loadComponent: () =>
            import('./features/students/main')
                .then(m => m.StudentMain)
    },
       { path: 'admin',
        loadComponent: () =>
            import('./features/admin/pages/LoginAdmin/LoginAdmin')
                .then(m => m.LoginAdmin)
    },

    { path: '**', redirectTo: '' }
];

