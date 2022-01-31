import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AStaffDetails, LockAProfileRequestBody, LoggedInStaffRole } from 'src/app/models/authModel';
import { ACustomer, RegisterCustomerDetails, User } from 'src/app/models/generalModels';
import { UserService } from 'src/app/services/user.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';
import { ActiveUsersComponent } from '../active-users/active-users.component';
import { SuccessfulUpdateComponent } from '../successful-update/successful-update.component';
// import { CustomerInformationComponent } from 'src/app/reusables/customer-information/customer-information.component';
import { UsersComponent } from '../users/users.component';


@Component({
  selector: 'app-initiate-lock-or-un-lock',
  templateUrl: './initiate-lock-or-un-lock.component.html',
  styleUrls: ['./initiate-lock-or-un-lock.component.scss']
})
export class InitiateLockOrUnLockComponent implements OnInit {
  staff: AStaffDetails | undefined = undefined;
  role: LoggedInStaffRole | undefined = undefined;
  reason: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {typeOfAction: 'initiate Lock' | 'initiate Unlock', user: User | RegisterCustomerDetails| ACustomer| {[key: string]: any}}, 
    private dialogRef: MatDialogRef<ActiveUsersComponent>,
    private dialog: MatDialog,
    private datepipe: DatePipe,
    private userservice: UserService,
    private utils: UtilityFuncsService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.staff = JSON.parse(sessionStorage.getItem('logged_user_info') as string);
    this.role = JSON.parse(sessionStorage.getItem('role') as string)
  }


  closeUnlockOrLockProfile(close:'lock' | 'unlock', event: Event){
    let date: Date | string = new Date(Date.now());
     date = this.datepipe.transform(date, 'dd-MM-yyyy hh ') as string;
     date = date.split('-').join('').split(' ').join('');
    const customerName = `${this.data.user.username}`;
    let formToSubmit: Partial<LockAProfileRequestBody>;
    close == 'lock' ? formToSubmit = {
      CustomerUsername: customerName,
      InitiatedBy: this.staff?.displayName as string,
      Reason: this.reason,
      SessionId: this.role?.sessionId as string,
      DateIssued: date,
      Email: this.role?.email as string
    } : formToSubmit = {
      CustomerUsername: customerName,
      InitiatedBy: this.staff?.displayName,
      Reason: this.reason,
      SessionId: this.role?.sessionId,
      Email: this.role?.email
    }
    const btn = event.target as HTMLButtonElement;  
    const prevText = btn.textContent;
    this.utils.loading4button(btn, 'yes', close == 'lock' ? 'Initiating Lock...': "Initiating Unlock...");
    close == 'lock' ? this.lockAProfile(formToSubmit, btn, prevText as string) : this.unlockAProfile(formToSubmit, btn, prevText as string);
   
  }


  lockAProfile(formToSubmit: Partial<LockAProfileRequestBody>, btn: HTMLButtonElement, prevText: string){
    this.userservice.lockAProfiile(formToSubmit).subscribe(
      val => {
        console.log(val);
        if(val.success){
          this.utils.loading4button(btn, 'done', prevText as string);
          this.dialogRef.close(val.responseMessage)
          const dialog = this.dialog.open(
            SuccessfulUpdateComponent, 
            {
              width: '40vw', 
              height: '50vh', 
              panelClass: 'successful_update',
              data: { 
                person: this.data.user.firstname + ' ' + (this.data.user as User).surname ?? (this.data.user as RegisterCustomerDetails).lastname, 
                type: close
              }
            }
            ).close('updated');
            // dialog.close(val.responseMessage);
          return;
        }
        this.utils.errorSnackBar('Locking the user account failed!', 'close');
        this.utils.loading4button(btn, 'done', prevText);
        // throw new Error(val.responseMessage);
      },
      err => {
        console.log(err);
        this.utils.loading4button(btn, 'done', prevText as string);
      }
    )
  }

  unlockAProfile(formToSubmit: Partial<LockAProfileRequestBody>, btn: HTMLButtonElement, prevText: string){
    this.userservice.unlockAProfile(formToSubmit).subscribe(
      val => {
        // console.log(val);
        if(val.success){
          this.utils.loading4button(btn, 'done', prevText as string);
          this.dialogRef.close(val.responseMessage);
          const dialog = this.dialog.open(
            SuccessfulUpdateComponent, 
            {
              width: '40vw', 
              height: '50vh', 
              panelClass: 'successful_update',
              data: { 
                person: this.data.user.firstname + ' ' + (this.data.user as User).surname ?? (this.data.user as RegisterCustomerDetails).lastname, 
                type: close
              }
            }
            ).close('updated');
          return;
        }
        this.utils.loading4button(btn, 'done', prevText);
        this.utils.errorSnackBar('unlocking the user account failed!', 'close');
      },
      err => {
        console.log(err);
        this.utils.loading4button(btn, 'done', prevText as string);
      }
    )
  }
 

}
