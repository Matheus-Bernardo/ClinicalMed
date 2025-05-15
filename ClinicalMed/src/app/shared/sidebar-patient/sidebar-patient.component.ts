import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environmentVersion } from '../../../environments/version';
import { Logout } from '../../../Services/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-patient',
  imports: [CommonModule],
  templateUrl: './sidebar-patient.component.html',
  styleUrl: './sidebar-patient.component.scss'
})
export class SidebarPatientComponent {
  @Input() isExpanded = true;
  @Input() version = environmentVersion.version;

  idPatient:number|null = null;

  constructor(private router: Router){
    
  }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const idValue = localStorage.getItem('id');
      this.idPatient = idValue !== null ? Number(idValue) : null;

    }
  }
   gotoDetailsClient(): void {
    this.router.navigate(['/info-patient']);
  }

  
  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  exitSystem(){
    Logout()
    this.router.navigate(['/login']);
    
  }
}
