import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-option-welcome-doctor',
  imports: [],
  templateUrl: './option-welcome-doctor.component.html',
  styleUrl: './option-welcome-doctor.component.scss'
})
export class OptionWelcomeDoctorComponent {

  constructor(private readonly router:Router){}

  navigateToCreateConsult(){
    this.router.navigate(['/create-consult'])
  }

    navigateToListConsults(){
    this.router.navigate(['/ListConsultUser'])
  }
}
