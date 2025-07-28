import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { StatusLabelPipe } from '../../../pipes/status-label.pipe';
import { environmentVersion } from '../../../environments/version';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { getConsultByUserService } from '../../../Services/getConsultByUser.service';
import { SidebarDoctorComponent } from '../../shared/sidebar-doctor/sidebar-doctor.component';
import { JitsiIframeComponent } from '../../shared/app-jitsi-iframe/app-jitsi-iframe.component';
import { SidebarPatientComponent } from '../../shared/sidebar-patient/sidebar-patient.component';


export interface PeriodicElement {
  doctor: string;
  position: number;
  patient: string;
  hourConsult: string;
  status: string;
  link: string;
}


interface ApiConsultResponse {
  id: number;
  typeAppointmentMedical: number;
  doctorName: string;
  patientName: string;
  consultationTime: string;
  status: number;
  consultationLink: string;
}


@Component({
  selector: 'app-list-consult-user',
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    StatusLabelPipe,
    JitsiIframeComponent,
    SidebarDoctorComponent,
    SidebarPatientComponent],
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
        status: item.status.toString(),
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

}
