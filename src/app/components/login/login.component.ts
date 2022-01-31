import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { AStaffDetails, LoggedInStaffRole, LogInResponse } from 'src/app/models/authModel';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showOrHide: string = "show";
  type: 'password'|'text' = 'password';
  loginForm: FormGroup = this.fb.group({});
  constructor(
    private authService: AuthServiceService,
    private utils: UtilityFuncsService,
    private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      Token: ['', Validators.required]
    })

  }

  changeVisibility(){
    this.type == 'password' ? this.type = 'text' : this.type = 'password';
    this.type == 'password' ? this.showOrHide = 'show': this.showOrHide = 'hide'; 
  }

  gotoRouter(){
    this.router.navigateByUrl('/dashboard');
  }

  submitForm(form: FormGroup, event: Event){
    const {value} = form;
    const btn = event.target as HTMLButtonElement;
    const prevText = btn.textContent as string;
    this.utils.loading4button(btn, 'yes', 'Signing you in...');

    const pObserver: PartialObserver<LogInResponse> = {
      next: (val) =>{
        const {user} = val;
        const{staff} = user;
        const reformedStaff: LoggedInStaffRole = {...staff, sessionId: val.sessionId}
        const {user: fullLoggedInUserDetails} = val.activeDir;
        sessionStorage.setItem('role', JSON.stringify(reformedStaff));
        sessionStorage.setItem('logged_user_info', JSON.stringify(fullLoggedInUserDetails));
        this.utils.successSnackBar(`Logged in as ${user.staff.email}`, `❌`);
        this.saveLoggedInUsersDetailsInLocalStorage(user.staff);
        this.router.navigate(['dashboard']);
      },
      error: error => {
        this.utils.loading4button(btn, 'done', prevText);
        this.loginForm.reset();
        this.utils.errorSnackBar(`Wrong username or password!!`, `✖`)
      }
    }
    this.authService.loginUser(value)
    .subscribe(pObserver);
    
  }

  saveLoggedInUsersDetailsInLocalStorage(staff: LoggedInStaffRole){
    console.log(staff);
  }

}
