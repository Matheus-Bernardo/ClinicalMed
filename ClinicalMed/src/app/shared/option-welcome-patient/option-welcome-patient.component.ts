import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-option-welcome-patient',
  imports: [],
  templateUrl: './option-welcome-patient.component.html',
  styleUrl: './option-welcome-patient.component.scss'
})
export class OptionWelcomePatientComponent {

  constructor(private readonly router:Router){}
  navigateToCreateConsult(){
    this.router.navigate(['/create-consult'])
  }

}
