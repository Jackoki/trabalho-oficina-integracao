import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AddSchools } from './pages/add-schools/add-schools';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AuthGuard } from './guards/auth-guard'
import { Schools } from './pages/schools/schools';
import { Users } from './pages/users/users';
import { EditSchools } from './pages/edit-schools/edit-schools';
import { AddWorkshops } from './pages/add-workshops/add-workshops';
import { EditUsers } from './pages/edit-users/edit-users';
import { EditWorkshops } from './pages/edit-workshops/edit-workshops';
import { UsersWorkshop } from './pages/users-workshops/users-workshop';
import { UsersWorkshopAdd } from './pages/users-workshops-add/users-workshop-add';
import { Classes } from './pages/classes/classes';
import { ClassesRollcall } from './pages/classes-rollcall/classes-rollcall';
import { ClassesRollcallEdit } from './pages/classes-rollcall-edit/classes-rollcall-edit';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: Home, canActivate: [AuthGuard] },
  { path: 'add-schools', component: AddSchools, canActivate: [AuthGuard] },
  { path: 'schools', component: Schools, canActivate: [AuthGuard] },
  { path: 'users', component: Users, canActivate: [AuthGuard] },
  { path: 'schools/edit/:id', component: EditSchools, canActivate: [AuthGuard] },
  { path: 'users/edit/:id', component: EditUsers, canActivate: [AuthGuard] },
  { path: 'add-workshops', component: AddWorkshops, canActivate: [AuthGuard] },
  { path: 'workshops/edit/:id', component: EditWorkshops, canActivate: [AuthGuard] },
  { path: 'workshops/workshop-users/:id', component: UsersWorkshop, canActivate: [AuthGuard] },
  { path: 'workshops/:id/workshop-users/add/:typeId', component: UsersWorkshopAdd, canActivate: [AuthGuard] },
  { path: 'workshops/:id/classes', component: Classes, canActivate: [AuthGuard]},
  { path: 'workshops/:workshopId/classes-rollcall/:classId?', component: ClassesRollcall, canActivate: [AuthGuard] },
  { path: 'workshops/:workshopId/classes-rollcall/edit/:classId', component: ClassesRollcallEdit, canActivate: [AuthGuard] }
];