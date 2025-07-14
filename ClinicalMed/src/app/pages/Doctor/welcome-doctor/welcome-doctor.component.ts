import { Component, OnInit } from '@angular/core';
import { environmentVersion } from '../../../../environments/version';
import { SidebarDoctorComponent } from '../../../shared/sidebar-doctor/sidebar-doctor.component';
import { OptionWelcomeDoctorComponent } from "../../../shared/option-welcome-doctor/option-welcome-doctor.component";

@Component({
  selector: 'app-welcome-doctor',
  imports: [SidebarDoctorComponent, OptionWelcomeDoctorComponent],
  templateUrl: './welcome-doctor.component.html',
  styleUrl: './welcome-doctor.component.scss'
})
export class WelcomeDoctorComponent implements OnInit {

  isSidebarExpanded = true;
  version = environmentVersion.version;
  nameDoctor: string | null = null;

  ngOnInit(): void {
    if(typeof window !== 'undefined'){
      this.nameDoctor = localStorage.getItem('name');
    }
  }

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
}
