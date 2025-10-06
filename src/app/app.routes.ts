import { Routes } from '@angular/router';
import { Main } from './main/main';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },

    {
        path: 'home',
        title: 'Home Page',
        component: Main
    }
];
