import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CasesComponent } from './features/cases/cases.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DoctorsComponent } from './features/doctors/doctors.component';
import { ToothTypesComponent } from './features/tooth-types/tooth-types.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: '', component: AppComponent,
      children: [
        {path: '', component: DashboardComponent},
        {path: 'doctors', component: DoctorsComponent},
        {path: 'cases', component: CasesComponent},
        {path: 'tooth', component: ToothTypesComponent}
      ]
    },
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
