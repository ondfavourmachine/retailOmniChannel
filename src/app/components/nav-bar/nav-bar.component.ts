import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AStaffDetails, LoggedInStaffRole } from 'src/app/models/authModel';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  toggleNotifications: boolean = false;
  loggedInStaff: Partial<AStaffDetails> = {};
  role: Partial<LoggedInStaffRole> = {}
  doNotDisturbYes: boolean = false;
  notificationIsRead: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.loggedInStaff =JSON.parse( sessionStorage.getItem('logged_user_info') as string ) ?? null;
    this.role = JSON.parse(sessionStorage.getItem('role') as string) ?? null
    
    // this.
  }

  
  showNotifications(){
    this.toggleNotifications = !this.toggleNotifications;
  }

  
  triggerDoNotDisturb(event: MatSlideToggleChange){
    const {checked} = event;
    this.doNotDisturbYes = checked;
  }

  toggleShowNotificationDetails(event: Event){
    const targetElement = (event.target as HTMLElement).closest('.dontDisturbIsFalse_container') as HTMLElement;
    targetElement.classList.contains('show') ? targetElement.classList.remove('show') : targetElement.classList.add('show');
    this.notificationIsRead = true;
  }
}
