import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddUsersComponent } from './pages/add-users/add-users.component';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AuthGuard } from './guards/auth-guard'

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'add-users', component: AddUsersComponent }
];

