import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environmentVersion } from '../../../../environments/version';
import { SidebarPatientComponent } from "../../../shared/sidebar-patient/sidebar-patient.component";
import { OptionWelcomeDoctorComponent } from "../../../shared/option-welcome-doctor/option-welcome-doctor.component";

@Component({
  selector: 'app-welcome-doctor',
  imports: [SidebarPatientComponent, OptionWelcomeDoctorComponent],
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
