import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, 

  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard],children :[{
    path:'addtasks',component:AddtaskComponent},
    {path:'tasklist',component:TasklistComponent},
   { path: 'addtasks/:userId', component: AddtaskComponent }],
   },

  

  { path: '**', redirectTo: 'login' } 
];
