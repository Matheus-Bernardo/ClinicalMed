import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-patient',
  imports: [ReactiveFormsModule],
  templateUrl: './register-patient.component.html',
  styleUrl: './register-patient.component.scss'
})
export class RegisterPatientComponent {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,){
    this.registerForm = this.formBuilder.group({
      email:[''],
    })
  }

  onSubmit(){

  }

}
