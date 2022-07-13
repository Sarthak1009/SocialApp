import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './modules/user/components/user-dashboard/user-dashboard.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: "", component: RegisterComponent, pathMatch: "full", outlet:"reg"},
  {path: 'user', canActivate:[AuthGuard], loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)},
  {path: "**", redirectTo: "", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
