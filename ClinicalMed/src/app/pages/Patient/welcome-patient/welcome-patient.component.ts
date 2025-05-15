import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environmentVersion } from '../../../../environments/version';
import { SidebarPatientComponent } from '../../../shared/sidebar-patient/sidebar-patient.component';
import {OptionWelcomePatientComponent} from "../../../shared/option-welcome-patient/option-welcome-patient.component";

@Component({
  selector: 'app-welcome-patient',
  imports: [CommonModule,SidebarPatientComponent,OptionWelcomePatientComponent],
  templateUrl: './welcome-patient.component.html',
  styleUrl: './welcome-patient.component.scss'
})
export class WelcomePatientComponent implements OnInit {
  
  isSidebarExpanded = true;
  version = environmentVersion.version;
  namePatient: string | null = null;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.namePatient = localStorage.getItem('name');
    }
  }
  
  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
}
