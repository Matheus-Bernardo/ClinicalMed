import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/Login/login.component';
import {RegisterPatientComponent} from './pages/Register/register-patient/register-patient.component'

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [
    RouterOutlet,
    LoginComponent,
    RegisterPatientComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ClinicalMed';
}
