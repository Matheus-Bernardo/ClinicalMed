import { Routes } from '@angular/router';
import { LoginComponent } from './pages/Login/login.component';
import { RegisterPatientComponent } from './pages/Register/register-patient/register-patient.component';
import { WelcomePatientComponent } from './pages/Patient/welcome-patient/welcome-patient.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterPatientComponent },
  { path: 'welcomePatient', component:WelcomePatientComponent},
  { path: '**', redirectTo: 'login' } 
];
