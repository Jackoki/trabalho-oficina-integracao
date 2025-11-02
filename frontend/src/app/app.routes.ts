import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddSchoolsComponent } from './pages/add-schools/add-schools.component';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AuthGuard } from './guards/auth-guard'
import { SchoolComponent } from './pages/schools/schools.component';
import { UserComponent } from './pages/users/users.component';
import { EditSchoolsComponent } from './pages/edit-schools/edit-schools.component';
import { AddWorkshopsComponent } from './pages/add-workshops/add-workshops.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'add-schools', component: AddSchoolsComponent, canActivate: [AuthGuard] },
  { path: 'schools', component: SchoolComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'schools/edit/:id', component: EditSchoolsComponent, canActivate: [AuthGuard] },
  { path: 'add-workshops', component: AddWorkshopsComponent, canActivate: [AuthGuard] }
];