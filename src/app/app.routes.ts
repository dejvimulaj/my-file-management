import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
// import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard]  // User must be logged in
  },
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [AuthGuard, RoleGuard], 
    data: { role: 'admin' }
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
