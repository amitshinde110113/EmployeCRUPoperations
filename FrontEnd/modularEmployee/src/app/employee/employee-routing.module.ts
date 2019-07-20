import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'list',pathMatch:'full'},
  {path:'list',component:ListComponent,canActivate:[AuthGuard]},
  {path:'update/:id',component:UpdateComponent,canActivate:[AuthGuard]},
  {path:'create',component:CreateComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
