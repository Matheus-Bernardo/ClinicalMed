import { FormsModule } from '@angular/forms';
import { addWeeks, subWeeks } from 'date-fns';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { CalendarEvent, CalendarModule, } from 'angular-calendar';
import { environmentVersion } from '../../../environments/version';
import { getDoctorsService } from '../../../Services/getDoctors.service';
import { getPatientsService } from '../../../Services/getPatients.service';
import { Component, Inject, LOCALE_ID, OnInit,PLATFORM_ID } from '@angular/core';
import { SidebarDoctorComponent } from '../../shared/sidebar-doctor/sidebar-doctor.component';
import { getTypeAppointmentService } from '../../../Services/getTypeAppointmentMedical.service';


@Component({
  selector: 'app-create-consult',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CalendarModule,
    SidebarDoctorComponent,
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


  ListDoctors:any[]=[];
  ListPatients:any[]=[];
  doctor: string|null = '';
  patient: string | null = '';
  typesAppointment: any[] = [];
  descont: number | null = null;
  selectedDate: Date | null = null;
  selectedTypeAppointmentId: number | null = null;
  roleuserActivite: string|null= localStorage.getItem("role");

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    @Inject(PLATFORM_ID) private platformId: Object,) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    this.roleuserActivite = localStorage.getItem("role");
      if(this.roleuserActivite == "doctor"){
        this.doctor = localStorage.getItem('name');
      }else{
        this.patient = localStorage.getItem('name');
      }
    }
    
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

  async loadDoctors(){
    try {
      this.ListDoctors = await getDoctorsService();
    } catch (error) {
      console.error("Erro ao carregar lista de médicos no componente",error);
    }
  }

  async loadPatients(){
    try {
      this.ListPatients = await getPatientsService();
    } catch (error) {
      console.error("Erro ao carregar lista de pacientes no componente",error);
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

  saveEvent() {
    if (this.selectedDate) {
      this.events = [
        ...this.events,
        {
          title: 'Ocupado',
          start: this.selectedDate,
          end: new Date(this.selectedDate.getTime() + 60 * 60000),
          color: { primary: '#800000', secondary: '#FA8072' },

        },
      ];
      this.visible = false;
    }
  }

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
}
