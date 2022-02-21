import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AStaffDetails, LoggedInStaffRole } from 'src/app/models/authModel';
import { ACustomerTransactionLimit, IntiateUpdateLimit } from 'src/app/models/generalModels';
import { TransactionsService } from 'src/app/services/transactions.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';
import { GeneralModifyLimitComponent } from '../general-modify-limit/general-modify-limit.component';

@Component({
  selector: 'app-update-acustomers-limit',
  templateUrl: './update-acustomers-limit.component.html',
  styleUrls: ['./update-acustomers-limit.component.scss']
})
export class UpdateACustomersLimitComponent implements OnInit {
  pinLimit: any;
  tokenLimit: any;
  username: any;
  reason: any;
  transactionType: any;
  modifiedTransactionDescription: string = '';
   constructor(
    @Inject(MAT_DIALOG_DATA) public data: {customer: ACustomerTransactionLimit},
    private dialogRef: MatDialogRef<GeneralModifyLimitComponent>,
    private transactionservice: TransactionsService,
    public utils: UtilityFuncsService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.pinLimit = this.utils.formatNumber(this.data.customer.daily_limit);
    this.tokenLimit = this.utils.formatNumber(this.data.customer.token);
    this.username = this.data.customer.username;
    this.transactionType = this.data.customer.transactiontype
    this.modifiedTransactionDescription = this.data.customer.trans_type == 2 ? 'Globus to other banks' : 'Globus to Globus'
  }


  updateLimit(event: Event){
    const btn = event.target as HTMLButtonElement;
    const prevText  = btn.textContent;
    const staffInitiatingUpdate = JSON.parse( sessionStorage.getItem('role') as string) as LoggedInStaffRole;
    const fullStaffDetails = JSON.parse(sessionStorage.getItem('logged_user_info') as string) as AStaffDetails;
    const reqBody: IntiateUpdateLimit = {
      custormerUsername: this.data.customer.username,
      initiatedby:`${fullStaffDetails.displayName}`,
      transtype: this.data.customer.trans_type,
      pinlimit: this.utils.removeCommasAndReturnANumber(this.pinLimit),
      tokenlimit: this.utils.removeCommasAndReturnANumber(this.tokenLimit),
      reason: this.reason,
      session: staffInitiatingUpdate.sessionId as string,
      email: staffInitiatingUpdate.email
    }
    this.utils.loading4button(btn, 'yes', 'Modifying...')
    console.log(reqBody);
    this.transactionservice.intiateUpdateLimit(reqBody)
    .subscribe(
      val => {
        console.log(val),
        this.utils.loading4button(btn, 'done', prevText as string);
        if(val.success){
          this.utils.successSnackBar(`Initiating Update Limit for ${reqBody.custormerUsername} successfull.`, 'close');
         this.dialogRef.close(val.success);
         return;
        }
        this.utils.errorSnackBar(`Initiating Update Limit for ${reqBody.custormerUsername} failed!`, 'close');
        this.dialogRef.close(val.success);
        
      },
      err => {
        console.log(err),
        this.utils.loading4button(btn, 'done', prevText as string);
        this.utils.errorSnackBar(`Initiating Update Limit for ${reqBody.custormerUsername} failed.`, 'close');
      }
    )
    
  }


  makeItReadable(event: Event, propertyInThisComp:string){
    const {value} = event.target as HTMLInputElement;
    let renewedVal = value.replace(/,/g, '');
    renewedVal = this.utils.formatNumber(isNaN(parseInt(renewedVal)) ? 0 : parseInt(renewedVal));
    (this as any)[propertyInThisComp] = renewedVal;
  }

}
