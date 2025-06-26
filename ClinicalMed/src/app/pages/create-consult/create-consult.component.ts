import { Component,Inject, LOCALE_ID,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent, CalendarModule,  } from 'angular-calendar';
import { addWeeks, subWeeks } from 'date-fns';
import { SidebarDoctorComponent } from '../../shared/sidebar-doctor/sidebar-doctor.component';
import { environmentVersion } from '../../../environments/version';

@Component({
  selector: 'app-create-consult',
  standalone:true,
  imports: [
    CommonModule,
    CalendarModule,
    SidebarDoctorComponent
  ],
  templateUrl: './create-consult.component.html',
  styleUrl: './create-consult.component.scss'
})


export class CreateConsultComponent  {
  viewDate: Date = new Date(); 
  events: CalendarEvent[] = [];

  isSidebarExpanded = true;
  version = environmentVersion.version;

  constructor(@Inject(LOCALE_ID) public locale: string) {} 

  
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
    const { date } = event;
    const title = prompt('Digite o título do agendamento:');
    if (title) {
      this.events = [
        ...this.events,
        {
          title,
          start: date,
          end: new Date(date.getTime() + 60 * 60000), // 1hr
          color: { primary: '#1e90ff', secondary: '#D1E8FF' },
        },
      ];
    }
  }
  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
}
