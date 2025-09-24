import { ToastrService } from 'ngx-toastr'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICreatePrescription } from '../../../Intefaces/Prescription/CreatePrescription';
import { CreatePrescriptionService } from '../../../Services/createPrescription.service';
import { FinishConsultWithPrescriptionService } from '../../../Services/FinishConsultWithPrescription.service';
import { FinishConsultWithoutPrescriptionService } from '../../../Services/FinishConsultWithoutPrescription.service';

@Component({
  selector: 'app-modal-prescription',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './modal-prescription.component.html',
  styleUrls: ['./modal-prescription.component.scss']
})
export class ModalPrescriptionComponent {
  @Output() confirmed = new EventEmitter<string>();
  @Output() canceled = new EventEmitter<void>();
  @Input() doctorName: string | null = null;
  @Input() patientName: string | null = null;
  @Input() consultationId?: number;
  @Input() crmDoctor?: string;

  constructor(private readonly toastr: ToastrService) {}

  validityPrescription: number = 0;
  remedyPrescription: string = '';
  frequency: string = '';
  dosageRemedy: string = '';
  frequencyRemedy: string = '';
  observation: string = '';
  today = new Date();

  confirm() {
    this.confirmed.emit('prescription saved');
  }

  cancel() {
    this.canceled.emit();
  }

  async finishWithPrescription() {
  try {
    
    const prescriptionData: ICreatePrescription = {
      patientName: this.patientName ?? '',
      doctorName: this.doctorName ?? '',
      validityPrescription: this.validityPrescription,
      crmDoctor: this.crmDoctor??'',
      remedyPrescription: this.remedyPrescription.split(',').map(r => r.trim()), // transforma em array
      frequency: this.frequency,
      dosageRemedy: this.dosageRemedy,
      frequencyRemedy: this.frequencyRemedy,
      observation: this.observation,
      createdAt: this.today
    };

    const createdPrescription = await CreatePrescriptionService(prescriptionData);
    const prescriptionID = createdPrescription.id; 
    
    await FinishConsultWithPrescriptionService({
      idMedicalConsultation: this.consultationId,
      prescriptionID
    });

    this.toastr.success('Consulta finalizada com prescrição!');
    this.confirmed.emit('finished with prescription');

  } catch (error) {
    console.error("Erro na finalização:", error);
    this.toastr.error('Erro ao finalizar consulta com prescrição.');
  }
}


  async finishWithoutPrescription() {
    try {
      await FinishConsultWithoutPrescriptionService({
        idMedicalConsultation: this.consultationId,
        
      });

      this.toastr.success('Consulta finalizada sem prescrição.');
      this.confirmed.emit('finished without prescription');

    } catch (error) {
      console.error(error);
      this.toastr.error('Erro ao finalizar consulta.');
    }
  }
}
