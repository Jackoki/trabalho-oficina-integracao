import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: Login },
  { path: 'register', component: Register }
];

