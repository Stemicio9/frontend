import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/common_pages/dashboard/dashboard.component';
import { RoleGuard } from 'src/app/guards/role.guard';
import { UserCreateComponent } from '../../user-create/user-create.component';
import {CruscottoComponent} from "../../../common_pages/cruscotto/cruscotto.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'cruscotto',
    component: CruscottoComponent
  },
  {
    path: 'utenti',
    component: UserCreateComponent,
    canActivate: [RoleGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalLayoutRoutingModule { }
