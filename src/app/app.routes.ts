import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
// import { RoleGuard } from './role.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { RegisterComponent } from './register/register.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FoldersComponent } from './folders/folders.component';

export const routes: Routes = [
  // Public routes outside of the main layout
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  // Main layout for authenticated routes
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
      { path: 'folders', component: FoldersComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      // Use relative redirect so it doesn't cause an infinite loop
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard' },
    ]
  },
  // Fallback if nothing matches
  { path: '**', redirectTo: 'login' }
];
