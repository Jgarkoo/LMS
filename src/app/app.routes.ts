import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },

    {
        path: 'home',
        title: 'Home Page',
        loadComponent: () => import('./main/main').then(m => m.Main)
    },

    {
        path: 'logIn',
        title: 'Login Page',
        loadComponent: () => import('./log-in/log-in').then(m => m.LogIn)
    },

    {
        path: 'login-register',
        title: 'Student/Teacher Log in Page',
        loadComponent: () => import('./log-in-register/log-in-register').then(m => m.LogInRegister)

    },

    { 
        path: '404', 
        title: 'Error Page',
        loadComponent: () => import('./error/error').then(m => m.Error)
    },

    { 
        path: '**', 
        redirectTo: '404'
    }
];
