import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ACustomer } from 'src/app/models/generalModels';
import { UserService } from 'src/app/services/user.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';

@Component({
  selector: 'app-quick-actions-lock-un-lock-modify-limit',
  templateUrl: './quick-actions-lock-un-lock-modify-limit.component.html',
  styleUrls: ['./quick-actions-lock-un-lock-modify-limit.component.scss']
})
export class QuickActionsLockUnLockModifyLimitComponent implements OnInit {
  isLoading: boolean = true;
  displayTable:boolean = false;
  customerInfo: string = '';
  completeCustomerInfo: ACustomer & {[key: string]:any} | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {typeOfAction: 'lock' | 'unlock' | 'modify limit'},
    public utils: UtilityFuncsService,
    private userservice: UserService,
  ) { }

  ngOnInit(): void {
  }

  startSeachingForCustomerInfo(){
    if(this.customerInfo.length < 1){
      	this.utils.errorSnackBar('Please enter a 10 digit customer account', 'close');
      return;
    }
      this.displayTable = true;
      this.fetchUserDetailsByAcctNumber(this.customerInfo);
  }

  async fetchUserDetailsByAcctNumber(accountNumber: string){
      try {
        const res = await this.userservice.getCustomerByAccountNumber(accountNumber);
        console.log(res);
        this.isLoading = false;
        this.completeCustomerInfo = {...res.userInfo, currentStatus: res.currentStatus};
        this.utils.successSnackBar(`Detail's of ${accountNumber} fetched successfully`, 'close');
      } catch (error) {
          console.log(error);
          this.utils.errorSnackBar(`Unable to fetch account information for ${accountNumber}`, 'close')
      }
  }

  // fetchUserDetailsByAccountForUpdatingLimit(){

  // }

}
