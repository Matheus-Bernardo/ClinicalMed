import { Routes } from '@angular/router';
import { LoginComponent } from './pages/Login/login.component';
import { InfoUserComponent } from './pages/info-user/info-user.component';
import { WelcomeDoctorComponent } from './pages/Doctor/welcome-doctor/welcome-doctor.component';
import { WelcomePatientComponent } from './pages/Patient/welcome-patient/welcome-patient.component';
import { RegisterPatientComponent } from './pages/Register/register-patient/register-patient.component';
import { CreateConsultComponent } from './pages/create-consult/create-consult.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'create-consult', component: CreateConsultComponent },
  { path: 'register', component: RegisterPatientComponent },
  { path: 'info-user', component: InfoUserComponent },
  { path: 'welcomeDoctor', component: WelcomeDoctorComponent },
  { path: 'welcomePatient', component:WelcomePatientComponent},
  { path: '**', redirectTo: 'login' } 
];
