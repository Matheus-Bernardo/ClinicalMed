
import { ToastrService } from 'ngx-toastr';
import { CommonModule,isPlatformBrowser } from '@angular/common';
import { Component, OnInit,Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { updateDoctorService } from '../../../Services/updateDoctor.service';
import { updatePatientService } from '../../../Services/updatePatient.service';
import { getDoctorByIdService } from '../../../Services/getDoctorById.service';
import { getPatientByIdService } from '../../../Services/getPatientById.service';
import { SidebarDoctorComponent } from '../../shared/sidebar-doctor/sidebar-doctor.component';
import { SidebarPatientComponent } from '../../shared/sidebar-patient/sidebar-patient.component';

@Component({
  selector: 'app-info-user',
  standalone: true,
  imports: [SidebarPatientComponent, ReactiveFormsModule, CommonModule, SidebarDoctorComponent],
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {

  doctorForm!: FormGroup;
  patientForm!: FormGroup;
  formSelected!: FormGroup;
  roleUser: string | null = null;
  idDoctor: number | null = null;
  idPatient: number | null = null;
  namePatient: string | null = null;

  editableFields: { [key: string]: boolean } = {};

  
  formFieldsPatient = [
    { controlName: 'email', placeholder: 'Email preenchido' },
    { controlName: 'firstName', placeholder: 'Primeiro Nome' },
    { controlName: 'lastName', placeholder: 'Último Nome' },
    { controlName: 'susCard', placeholder: 'Cartão do SUS' },
    { controlName: 'phone', placeholder: 'Telefone' },
    { controlName: 'street', placeholder: 'Rua' },
    { controlName: 'district', placeholder: 'Bairro' },
    { controlName: 'city', placeholder: 'Cidade' },
    { controlName: 'novaSenha', placeholder: 'Nova Senha' }
  ];

  
  formFieldsDoctor = [
    { controlName: 'firstName', placeholder: 'Primeiro Nome' },
    { controlName: 'lastName', placeholder: 'Último Nome' },
    { controlName: 'crm', placeholder: 'CRM' },
    { controlName: 'areaSpecialty', placeholder: 'Área de Especialidade' },
    { controlName: 'email', placeholder: 'Email preenchido' },
    { controlName: 'novaSenha', placeholder: 'Nova Senha' }
  ];

  constructor(private fb: FormBuilder, private toastr: ToastrService,@Inject(PLATFORM_ID) private platformId: Object) { }

  async ngOnInit(): Promise<void> {
  if (isPlatformBrowser(this.platformId)) {
    const idUser = localStorage.getItem('id');
    this.roleUser = localStorage.getItem('role');
    this.namePatient = localStorage.getItem('name');

    if (this.roleUser === 'doctor') {
      this.idDoctor = idUser !== null ? Number(idUser) : null;
      this.initFormDoctor();
      this.formSelected = this.doctorForm;
      if (this.idDoctor !== null) {
        await this.loadDoctorData(this.idDoctor);
      }
    } else {
      this.idPatient = idUser !== null ? Number(idUser) : null;
      this.initFormPatient();
      this.formSelected = this.patientForm;
      if (this.idPatient !== null) {
        await this.loadPatientData(this.idPatient);
      }
    }
  }
}


  async onSubmit(): Promise<void> {
    const id = this.roleUser === 'doctor' ? this.idDoctor : this.idPatient;

    if (id !== null) {
      const payload: any = {};

      Object.keys(this.editableFields).forEach((key) => {
        if (this.editableFields[key]) {
          const value = this.currentForm.get(key)?.value;
          if (value !== undefined) {
            payload[key] = value;
          }
        }
      });

      if (Object.keys(payload).length === 0) {
        console.warn('Nenhum campo foi alterado!');
        return;
      }

      try {
        if (this.roleUser === 'doctor') {
          await updateDoctorService(id,payload);
          localStorage.setItem('name',payload.firstName);
          this.toastr.success('Informações atualizadas com sucesso!');
        } else {
          await updatePatientService(id, payload);
          localStorage.setItem('name',payload.firstName);
          this.toastr.success('As suas informações foram atualizadas com sucesso!');
        }

        Object.keys(this.editableFields).forEach((key) => {
          if (this.editableFields[key]) {
            this.editableFields[key] = false;
            this.currentForm.get(key)?.disable();
          }
        });

      } catch (error: any) {
        this.toastr.error(error, 'Erro ao atualizar');
        console.error(error.message);
      }
    } else {
      console.warn('ID não encontrado');
    }
  }

  get isSaveDisabled(): boolean {
    return !Object.values(this.editableFields).some(value => value === true);
  }

  private initFormPatient(): void {
    this.patientForm = this.fb.group({
      email: [''],
      firstName: [''],
      lastName: [''],
      susCard: [''],
      phone: [''],
      street: [''],
      district: [''],
      city: [''],
      novaSenha: ['']
    });

    this.formFieldsPatient.forEach(field => {
      this.editableFields[field.controlName] = false;
      this.patientForm.get(field.controlName)?.disable();
    });
  }

  private initFormDoctor(): void {
    this.doctorForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      crm: [''],
      areaSpecialty: [''],
      email: [''],
      novaSenha: ['']
    });

    this.formFieldsDoctor.forEach(field => {
      this.editableFields[field.controlName] = false;
      this.doctorForm.get(field.controlName)?.disable();
    });
  }

  private async loadPatientData(id: number): Promise<void> {
    try {
      const response = await getPatientByIdService(id);
      
      this.patientForm.patchValue({
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        susCard: response.susCard,
        phone: response.phone,
        street: response.street,
        district: response.district,
        city: response.city
      });
    } catch (error: unknown) {
      console.error('Erro ao carregar paciente', error);
    }
  }

  private async loadDoctorData(id: number): Promise<void> {
    try {
      const response = await getDoctorByIdService(id);

      this.doctorForm.patchValue({
        firstName: response.firstName,
        lastName: response.lastName,
        crm: response.crm,
        areaSpecialty: response.areaSpecialty,
        email: response.email
      });
    } catch (error: unknown) {
      console.error('Erro ao carregar médico', error);
    }
  }

  editField(controlName: string): void {
    this.editableFields[controlName] = true;
    this.currentForm.get(controlName)?.enable();
  }

  cancelEdit(controlName: string): void {
    this.editableFields[controlName] = false;
    this.currentForm.get(controlName)?.disable();
  }

  get currentForm(): FormGroup {
    return this.roleUser === 'doctor' ? this.doctorForm : this.patientForm;
  }
  get currentFields() {
    return this.roleUser === 'doctor' ? this.formFieldsDoctor : this.formFieldsPatient;
  }

}
