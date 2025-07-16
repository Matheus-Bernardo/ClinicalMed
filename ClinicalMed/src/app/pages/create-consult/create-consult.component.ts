import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { addWeeks, subWeeks } from 'date-fns';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CalendarEvent, CalendarModule } from 'angular-calendar';
import { environmentVersion } from '../../../environments/version';
import { getDoctorsService } from '../../../Services/getDoctors.service';
import { getPatientsService } from '../../../Services/getPatients.service';
import { Component, Inject, LOCALE_ID, OnInit, PLATFORM_ID } from '@angular/core';
import { getConsultsMedicalService } from '../../../Services/getConsultMedical.service';
import { CreateConsultMedicalService } from '../../../Services/createConsultMedical.service';
import { SidebarDoctorComponent } from '../../shared/sidebar-doctor/sidebar-doctor.component';
import { getTypeAppointmentService } from '../../../Services/getTypeAppointmentMedical.service';
import { SidebarPatientComponent } from '../../shared/sidebar-patient/sidebar-patient.component';

@Component({
  selector: 'app-create-consult',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CalendarModule,
    SidebarDoctorComponent,
    SidebarPatientComponent
],
  templateUrl: './create-consult.component.html',
  styleUrl: './create-consult.component.scss'
})
export class CreateConsultComponent implements OnInit {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  isSidebarExpanded = true;
  version = environmentVersion.version;
  visible = false;
  isLoading = false; 

  doctorId: any;
  patientID: any;
  ListDoctors: any[] = [];
  ListPatients: any[] = [];
  typesAppointment: any[] = [];
  descont: number | null = null;
  doctorName: string | null = '';
  patientName: string | null = '';
  selectedDate: Date | null = null;
  selectedTypeAppointmentId: number | null = null;
  roleuserActivite: string | null = localStorage.getItem("role");

  constructor(
    private toastr: ToastrService,
    @Inject(LOCALE_ID) public locale: string,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.roleuserActivite = localStorage.getItem("role");
      if (this.roleuserActivite == "doctor") {
        this.doctorName = localStorage.getItem('name');
        this.doctorId = localStorage.getItem("id");
      } else {
        this.patientName = localStorage.getItem('name');
        this.patientID = localStorage.getItem("id");
      }
    }

    this.loadConsults();
    this.loadTypesAppointment();
    this.loadDoctors();
    this.loadPatients();
  }

  async loadTypesAppointment() {
    try {
      this.typesAppointment = await getTypeAppointmentService();
    } catch (error) {
      console.error('Erro ao carregar tipos de atendimento:', error);
    }
  }

  async loadDoctors() {
    try {
      this.ListDoctors = await getDoctorsService();
    } catch (error) {
      console.error("Erro ao carregar lista de médicos no componente", error);
    }
  }

  async loadPatients() {
    try {
      this.ListPatients = await getPatientsService();
    } catch (error) {
      console.error("Erro ao carregar lista de pacientes no componente", error);
    }
  }

  async loadConsults() {
    try {
      const consults = await getConsultsMedicalService();
      this.events = consults.map((c: any) => ({
        title: `Ocupado`,
        start: new Date(c.consultationTime),
        end: new Date(new Date(c.consultationTime).getTime() + 60 * 60 * 1000),
        color: { primary: '#800000', secondary: '#FA8072' },
      }));
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
      this.toastr.error('Erro ao carregar consultas');
    }
  }

  nextWeek(): void {
    this.viewDate = addWeeks(this.viewDate, 1);
  }

  previousWeek(): void {
    this.viewDate = subWeeks(this.viewDate, 1);
  }

  today(): void {
    this.viewDate = new Date();
  }

  handleHourSegmentClick(event: any) {
    this.selectedDate = event.date;
    this.visible = true;
  }

  async saveEvent() {
    if (!this.selectedTypeAppointmentId) {
      alert('Selecione o tipo de atendimento.');
      return;
    }

    if (!this.selectedDate) {
      alert('Selecione a data e horário.');
      return;
    }

    let doctorIdToSend: number | null = null;
    let patientIdToSend: number | null = null;

    if (this.roleuserActivite === 'doctor') {
      doctorIdToSend = Number(this.doctorId);
      patientIdToSend = this.patientID ? Number(this.patientID) : null;
    } else {
      doctorIdToSend = this.doctorId ? Number(this.doctorId) : null;
      patientIdToSend = this.patientID ? Number(this.patientID) : null;
    }

    const scheduling = {
      typeAppointmentMedical: this.selectedTypeAppointmentId,
      doctorId: doctorIdToSend,
      patientId: patientIdToSend,
      consultationTime: this.selectedDate.toISOString(),
      agreementDiscount: this.descont ?? 0
    };

    
    this.isLoading = true;

    try {
      await CreateConsultMedicalService(scheduling);
      this.loadConsults();
      this.toastr.success('Consulta agendada com sucesso!');
      this.visible = false;
    } catch (error:any) {
      this.toastr.error(error, 'Erro ao criar consulta');
    } finally {
      this.isLoading = false;
    }
  }

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
}
