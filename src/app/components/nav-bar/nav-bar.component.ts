import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { AStaffDetails, LoggedInStaffRole } from 'src/app/models/authModel';
import { AuthServiceService } from 'src/app/services/auth-service.service';

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
  constructor(private authService: AuthServiceService, private router: Router) { }

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

  showLogout(event: Event){
    const found = (event.target as HTMLElement).closest('.drop_down');
    found?.classList.toggle('logout_open');
    (found?.querySelector('.logout') as HTMLElement).classList.toggle('show');
  }

  logoutUser(event: Event){
    const sessionId = this.role.sessionId as string;
    const username = this.role.email as string;
    sessionStorage.clear();
    this.router.navigate(['/']);
    this.authService.logout({username,sessionId})
    .subscribe()
  }
}
