import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getPatientByIdService } from '../../../../Services/getPatientById.service';
import { SidebarPatientComponent } from '../../../shared/sidebar-patient/sidebar-patient.component';
import { updatePatientService } from '../../../../Services/updatePatient.service';

@Component({
  selector: 'app-info-patient',
  standalone: true,
  imports: [SidebarPatientComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './info-patient.component.html',
  styleUrls: ['./info-patient.component.scss']
})
export class InfoPatientComponent implements OnInit {

  patientForm!: FormGroup;
  namePatient: string | null = null;
  idPatient: number | null = null;

  editableFields: { [key: string]: boolean } = {};

  formFields = [
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

  constructor(private fb: FormBuilder, private toastr: ToastrService) { }

  async ngOnInit(): Promise<void> {
    if (typeof window !== 'undefined') {
      this.namePatient = localStorage.getItem('name');

      const idUser = localStorage.getItem('id');
      this.idPatient = idUser !== null ? Number(idUser) : null;
    }

    this.initForm();

    if (this.idPatient !== null) {
      await this.loadPatientData(this.idPatient);
    } else {
      console.warn('Id do paciente não encontrado no localStorage!');
    }
  }
  async onSubmit(): Promise<void> {
    if (this.idPatient !== null) {
      const payload: any = {};

      Object.keys(this.editableFields).forEach((key) => {
        if (this.editableFields[key]) {
          const value = this.patientForm.get(key)?.value;
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
        const response = await updatePatientService(this.idPatient, payload);
        console.log('Paciente atualizado com sucesso!', response);
        this.toastr.success('As suas informações foram atualizadas com sucesso!')

        Object.keys(this.editableFields).forEach((key) => {
          if (this.editableFields[key]) {
            this.editableFields[key] = false;
            this.patientForm.get(key)?.disable();
          }
        });

      } catch (error: any) {
        this.toastr.error(error, 'Erro ao fazer login');
        console.error(error.message);
      }
    } else {
      console.warn('ID do paciente não encontrado');
    }
  }


  get isSaveDisabled(): boolean {
    return !Object.values(this.editableFields).some(value => value === true);
  }


  private initForm(): void {
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

    // Inicializa todos como desabilitados
    this.formFields.forEach(field => {
      this.editableFields[field.controlName] = false;
      this.patientForm.get(field.controlName)?.disable();
    });
  }

  private async loadPatientData(id: number): Promise<void> {
    try {
      const response = await getPatientByIdService(id);
      console.log('Dados do paciente:', response);

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
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('Erro desconhecido ao carregar paciente', error);
      }
    }
  }

  editField(controlName: string): void {
    this.editableFields[controlName] = true;
    this.patientForm.get(controlName)?.enable();
  }

  cancelEdit(controlName: string): void {
    this.editableFields[controlName] = false;
    this.patientForm.get(controlName)?.disable();
  }
}
