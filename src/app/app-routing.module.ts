import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternalLayoutComponent } from './components/internal_layout/internal-layout/internal-layout.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: InternalLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../app/components/internal_layout/internal-layout/internal-layout-routing.module').then(x => x.InternalLayoutRoutingModule),
        canActivate: [AuthGuard]
      }]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    redirectTo:'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
