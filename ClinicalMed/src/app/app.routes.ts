import { Routes } from '@angular/router';
import { LoginComponent } from './pages/Login/login.component';
import { InfoPatientComponent } from './pages/Patient/info-patient/info-patient.component';
import { RegisterPatientComponent } from './pages/Register/register-patient/register-patient.component';
import { WelcomePatientComponent } from './pages/Patient/welcome-patient/welcome-patient.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterPatientComponent },
  { path: 'welcomePatient', component:WelcomePatientComponent},
  { path: 'info-patient', component: InfoPatientComponent },
  { path: '**', redirectTo: 'login' } 
];
