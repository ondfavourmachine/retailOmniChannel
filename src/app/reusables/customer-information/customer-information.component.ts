import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InitiateLockOrUnLockComponent } from 'src/app/components/initiate-lock-or-un-lock/initiate-lock-or-un-lock.component';
import { UsersComponent } from 'src/app/components/users/users.component';
import { LoggedInStaffRole } from 'src/app/models/authModel';
import { AccountStatus, ACustomer, RegisterCustomerDetails } from 'src/app/models/generalModels';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.scss']
})
export class CustomerInformationComponent implements OnInit {
  role: LoggedInStaffRole | undefined;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ACustomer & {reg: RegisterCustomerDetails} & { currentStatus:  AccountStatus } & {userLogs: Array<any>}, 
    private dialog: MatDialog,
    public utils: UtilityFuncsService,
    private dialogRef: MatDialogRef<UsersComponent>
    ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.role = JSON.parse(sessionStorage.getItem('role') as string);
    
  }

  intiateLockOrUnLock(){
   const currentlyOpenElement =  document.querySelector('.customerInformationComp');
    currentlyOpenElement?.classList.contains('shrink') ? currentlyOpenElement.classList.remove('shrink') : currentlyOpenElement?.classList.add('shrink'); 
    const dialog = this.dialog.open(
      InitiateLockOrUnLockComponent, 
      {width:'40vw', 
      height: 'auto', 
      panelClass: 'initiateLockOrUnLock',
      data: {
        typeOfAction: this.data.currentStatus == 'Account Active' ? 'initiate Lock' : 'initiate Unlock',
        user: this.data.reg ?? this.data
      }})
    dialog.afterClosed().subscribe(
      val =>{
        currentlyOpenElement?.classList.remove('shrink');
      },
      err => console.log(err)
    )
  }

  updateLimit(){

  }

}
