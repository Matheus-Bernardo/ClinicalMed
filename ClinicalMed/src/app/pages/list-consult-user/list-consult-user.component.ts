import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { StatusLabelPipe } from '../../../pipes/status-label.pipe';
import { environmentVersion } from '../../../environments/version';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { getConsultByUserService } from '../../../Services/getConsultByUser.service';
import { SidebarDoctorComponent } from '../../shared/sidebar-doctor/sidebar-doctor.component';
import { JitsiIframeComponent } from '../../shared/app-jitsi-iframe/app-jitsi-iframe.component';
import { SidebarPatientComponent } from '../../shared/sidebar-patient/sidebar-patient.component';
import { ModalPrescriptionComponent } from '../../shared/modal-prescription/modal-prescription.component';

export interface PeriodicElement {
  doctor: string;
  position: number;
  patient: string;
  hourConsult: string;
  status: string;
  link: string;
}

interface ApiConsultResponse {
  typeAppointment: string;
  doctorName: string;
  patientName: string;
  consultationTime: string;
  consultationLink: string;
  status: string;
}

@Component({
  selector: 'app-list-consult-user',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    StatusLabelPipe,
    JitsiIframeComponent,
    SidebarDoctorComponent,
    MatSelectModule,
    MatFormFieldModule,
    SidebarPatientComponent,
    ModalPrescriptionComponent,
  ],
  templateUrl: './list-consult-user.component.html',
  styleUrl: './list-consult-user.component.scss'
})

export class ListConsultUserComponent implements OnInit {

  isSidebarExpanded = true;
  version = environmentVersion.version;
  isLoading = false;

  displayedColumns: string[] = ['position', 'doctor', 'patient', 'hourConsult', 'status', 'link'];
  dataSource: PeriodicElement[] = [];

  roleuserActivite: string | null = null;
  nameuserActivite: string | null = null;

  selectedRoomUrl: string | null = null;

  showPrescriptionModal = false;
  selectedElement: PeriodicElement | null = null;


  statusOptions = [
    { value: 'PENDING', label: 'Pendente' },
    { value: 'DONE', label: 'Realizada' },
    { value: 'CANCELED', label: 'Cancelada' }
  ];

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.roleuserActivite = localStorage.getItem("role");
      this.nameuserActivite = localStorage.getItem("name");
      const userId = Number(localStorage.getItem("id"));
      if (userId) {
        this.loadConsults(userId);
      }
    }
  }

  private async loadConsults(id: number): Promise<void> {
    try {
      this.isLoading = true;
      const response: ApiConsultResponse[] = await getConsultByUserService(id);

      this.dataSource = response.map((item, index) => ({
        position: index + 1,
        doctor: `${item.doctorName}`,
        patient: item.patientName,
        hourConsult: new Date(item.consultationTime).toLocaleString('pt-BR'),
        status: item.status,
        link: item.consultationLink
      }));
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    } finally {
      this.isLoading = false;
    }
  }

  openConsult(link: string) {
    this.selectedRoomUrl = link;
  }

  closeConsult() {
    this.selectedRoomUrl = null;
  }

  async updateConsultStatus(element: PeriodicElement, newStatus: string): Promise<void> {
    if (newStatus === 'DONE') {
      this.selectedElement = element;
      this.showPrescriptionModal = true;
    } else {
      element.status = newStatus;
      this.dataSource = [...this.dataSource];
    }
  }

  onPrescriptionConfirmed(receita: string) {
    if (this.selectedElement) {
      console.log('Receita prescrita:', receita);
      this.selectedElement.status = 'DONE';
      
      this.dataSource = [...this.dataSource];
    }
    this.closePrescriptionModal();
  }

  closePrescriptionModal() {
    this.showPrescriptionModal = false;
    this.selectedElement = null;
  }


}