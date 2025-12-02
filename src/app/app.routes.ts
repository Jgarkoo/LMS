import { Routes } from '@angular/router';
import { authGuard } from './guard/loginguard-guard';

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
        path: 'student-page',
        title: 'student page',
        canActivate:[authGuard],
        canLoad:[authGuard],
        loadComponent: () => import ('./studentpage/studentpage').then(m=>m.Studentpage)
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
