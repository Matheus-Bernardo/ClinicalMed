import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environmentVersion } from '../../../environments/version';
@Component({
  selector: 'app-sidebar-patient',
  imports: [CommonModule],
  templateUrl: './sidebar-patient.component.html',
  styleUrl: './sidebar-patient.component.scss'
})
export class SidebarPatientComponent {
  @Input() isExpanded = true;
  @Input() version = environmentVersion.version;
  
  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}
