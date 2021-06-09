import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CazeFormComponent } from './features/cazes/caze-form/caze-form.component';
import { CazesComponent } from './features/cazes/cazes.component';
import { PatientFormComponent } from './features/cazes/patient-form/patient-form.component';
import { ToothFormComponent } from './features/cazes/tooth-form/tooth-form.component';
import { ContentComponent } from './features/content/content.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DoctorsComponent } from './features/doctors/doctors.component';
import { PatientsComponent } from './features/patients/patients.component';
import { ToothTypesComponent } from './features/tooth-types/tooth-types.component';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';

const routes: Routes = [{
  path: '', component: ContentComponent,
  children: [
    {path: 'main', component: DashboardComponent},
    {path: 'sidemenu', component:SideMenuComponent},
    {path: 'doctors', component: DoctorsComponent},
    {path: 'cases', component: CazesComponent},
    {path: 'patients', component: PatientsComponent},
    {path: 'toothtypes', component: ToothTypesComponent},
    {path: 'caseform', component: CazeFormComponent},
    {path: 'patientform', component: PatientFormComponent},
    {path: 'toothform', component: ToothFormComponent},
  ]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
