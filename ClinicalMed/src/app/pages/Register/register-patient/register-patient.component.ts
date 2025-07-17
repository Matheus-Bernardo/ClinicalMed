import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CreatePatient } from '../../../../Services/registerPatient.service';
import { ICreatePatient } from '../../../../Intefaces/Patient/PatientRegister';
import { FormBuilder, ReactiveFormsModule, Validators,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-patient',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './register-patient.component.html',
  styleUrl: './register-patient.component.scss'
})
export class RegisterPatientComponent {

  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cpf: ['', Validators.required],
      birthDate: ["", Validators.required],
      phone: ["", Validators.required],
      street: ["", Validators.required],
      district: ["", Validators.required],
      city: ["", Validators.required],
      complement: [""],
      email: ["", Validators.required],
      password: ["", Validators.minLength(6)],
      confirmedPassword: ["", Validators.required],
      messagePhone: ["", Validators.required],
      susCard: ["", Validators.required],
      familyHistoryDisease: [''],
      medicalAgreements: ['']

    })
  }

  onSubmit() {
    this.isLoading = true;
    const dataToSend = this.mapFormToPatientData();

    CreatePatient(dataToSend).then((res) => {
      this.toastr.success('Cadastro realizado com sucesso!');
      this.registerForm.reset()
    })
      .catch((error) => {
        this.toastr.error(error, 'Erro ao cadastrar')
      })
      .finally(()=>{
        this.isLoading = false;
      });

  }

  private mapFormToPatientData(): ICreatePatient {
    const formValues = this.registerForm.value;

    return {
      ...formValues,
      familyHistoryDisease: formValues.familyHistoryDisease
        ? formValues.familyHistoryDisease.split(',').map((s: string) => s.trim())
        : [],
      medicalAgreements: formValues.medicalAgreements
        ? formValues.medicalAgreements.split(',').map((s: string) => s.trim())
        : []
    };
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }


}
