import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AddSchoolsComponent } from './pages/add-schools/add-schools';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AuthGuard } from './guards/auth-guard'
import { SchoolComponent } from './pages/schools/schools';
import { UserComponent } from './pages/users/users';
import { EditSchoolsComponent } from './pages/edit-schools/edit-schools';
import { AddWorkshopsComponent } from './pages/add-workshops/add-workshops';
import { EditUserComponent } from './pages/edit-users/edit-users';
import { EditWorkshopsComponent } from './pages/edit-workshops/edit-workshops';
import { UserWorkshopComponent } from './pages/users-workshops/users-workshop';
import { UserWorkshopAddComponent } from './pages/users-workshops-add/users-workshop-add';
import { ClassesPage } from './pages/classes/classes';
import { ClassesRollcallPage } from './pages/classes-rollcall/classes-rollcall';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'add-schools', component: AddSchoolsComponent, canActivate: [AuthGuard] },
  { path: 'schools', component: SchoolComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'schools/edit/:id', component: EditSchoolsComponent, canActivate: [AuthGuard] },
  { path: 'users/edit/:id', component: EditUserComponent, canActivate: [AuthGuard] },
  { path: 'add-workshops', component: AddWorkshopsComponent, canActivate: [AuthGuard] },
  { path: 'workshops/edit/:id', component: EditWorkshopsComponent, canActivate: [AuthGuard] },
  { path: 'workshops/workshop-users/:id', component: UserWorkshopComponent, canActivate: [AuthGuard] },
  { path: 'workshops/:id/workshop-users/add/:typeId', component: UserWorkshopAddComponent, canActivate: [AuthGuard] },
  { path: 'workshops/:id/classes', component: ClassesPage, canActivate: [AuthGuard]},
  { path: 'workshops/:workshopId/classes-rollcall/:classId', component: ClassesRollcallPage, canActivate: [AuthGuard] }
];