import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddUsersComponent } from './pages/add-users/add-users.component';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AuthGuard } from './guards/auth-guard'
import { SchoolComponent } from './pages/schools/schools.component';
import { UserComponent } from './pages/users/users.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'add-users', component: AddUsersComponent, canActivate: [AuthGuard] },
  { path: 'schools', component: SchoolComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] }
];