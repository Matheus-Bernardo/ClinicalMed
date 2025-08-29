import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

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


  prescriptionText = '';
  today = new Date();


  confirm() {
    this.confirmed.emit(this.prescriptionText);
  }

  cancel() {
    this.canceled.emit();
  }
}
