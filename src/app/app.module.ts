import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common'; 
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNGModule } from '../app/PrimeNG.module'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DoctorsComponent } from './features/doctors/doctors.component';
import { ToothTypesComponent } from './features/tooth-types/tooth-types.component';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';
import { PatientsComponent } from './features/patients/patients.component';
import { ContentComponent } from './features/content/content.component';
import { ConfirmationService } from 'primeng/api';
import { CazesComponent } from './features/cazes/cazes.component';
import { CazeFormComponent } from './features/cazes/caze-form/caze-form.component';
import { PatientFormComponent } from './features/cazes/patient-form/patient-form.component';
import { ToothFormComponent } from './features/cazes/tooth-form/tooth-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DoctorsComponent,
    ToothTypesComponent,
    SideMenuComponent,
    PatientsComponent,
    ContentComponent,
    CazesComponent,
    CazeFormComponent,
    PatientFormComponent,
    ToothFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNGModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
