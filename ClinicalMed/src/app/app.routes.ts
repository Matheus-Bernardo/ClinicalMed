import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { doctorGuard } from './guards/doctor.guard';
import { patientGuard } from './guards/patient.guard';
import { LoginComponent } from './pages/Login/login.component';
import { InfoUserComponent } from './pages/info-user/info-user.component';
import { CreateConsultComponent } from './pages/create-consult/create-consult.component';
import { WelcomeDoctorComponent } from './pages/Doctor/welcome-doctor/welcome-doctor.component';
import { WelcomePatientComponent } from './pages/Patient/welcome-patient/welcome-patient.component';
import { RegisterPatientComponent } from './pages/Register/register-patient/register-patient.component';
import { ListConsultUserComponent } from './pages/list-consult-user/list-consult-user.component';

// Rotas públicas
const publicRoutes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'ListConsultUser', component: ListConsultUserComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterPatientComponent, pathMatch: 'full' },
];

const privateRoutes: Routes = [
  { path: 'create-consult', component: CreateConsultComponent, canActivate: [authGuard], pathMatch: 'full' },
  { path: 'info-user', component: InfoUserComponent, canActivate: [authGuard], pathMatch: 'full' },
];

// Rotas privadas específicas para patient
const privatePatientRoutes: Routes = [
  { path: 'welcomePatient', component: WelcomePatientComponent, canActivate: [patientGuard],pathMatch: 'full' },
];

// Rotas privadas específicas para doctor
const privateDoctorRoutes: Routes = [
  { path: 'welcomeDoctor', component: WelcomeDoctorComponent, canActivate: [doctorGuard],pathMatch: 'full' },
];

// Todas as rotas
export const routes: Routes = [
  ...publicRoutes,
  ...privateRoutes,
  ...privatePatientRoutes,
  ...privateDoctorRoutes,
  { path: '**', redirectTo: 'login' },
];
