import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';
import { Logout } from '../../../Services/logout.service';
import { environmentVersion } from '../../../environments/version';
@Component({
  selector: 'app-sidebar-doctor',
  imports: [CommonModule],
  templateUrl: './sidebar-doctor.component.html',
  styleUrl: './sidebar-doctor.component.scss'
})
export class SidebarDoctorComponent {
  @Input() isExpanded = true;
  @Input() version = environmentVersion.version;

  idDoctor:number|null = null;

  constructor(private readonly router:Router){}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const idValue = localStorage.getItem('id');
      this.idDoctor = idValue !== null ? Number(idValue) : null;

    }
  }

  gotoDetailsDoctor(): void {
    this.router.navigate(['/info-user']);
  }

  
  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  exitSystem(){
    Logout()
    this.router.navigate(['/login']);
    
  }

  goToWelcomeDoctor(){
    this.router.navigate(['/welcomeDoctor']);
  }

}
