import { FormsModule } from '@angular/forms';
import { addWeeks, subWeeks } from 'date-fns';
import { CommonModule } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { environmentVersion } from '../../../environments/version';
import { CalendarEvent, CalendarModule, } from 'angular-calendar';
import { SidebarDoctorComponent } from '../../shared/sidebar-doctor/sidebar-doctor.component';



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


export class CreateConsultComponent {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  isSidebarExpanded = true;
  version = environmentVersion.version;
  visible = false;
  selectedDate: Date | null = null; 
  tipoAtendimento: number | null = null;
  enfermeira: string = '';
  paciente: number | null = null;
  desconto: number | null = null;


  constructor(@Inject(LOCALE_ID) public locale: string) { }


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
