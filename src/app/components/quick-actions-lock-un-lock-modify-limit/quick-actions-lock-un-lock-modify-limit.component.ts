import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartialObserver } from 'rxjs';
import { ACustomer, ACustomersUpdateLimit, ACustomerTransactionLimit, FullCustomerDetails } from 'src/app/models/generalModels';
import { TransactionsService } from 'src/app/services/transactions.service';
import { UserService } from 'src/app/services/user.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';
import { UpdateACustomersLimitComponent } from '../update-acustomers-limit/update-acustomers-limit.component';

export type ExceptionalCustomer =  ACustomer & {[key: string]:any} | undefined

@Component({
  selector: 'app-quick-actions-lock-un-lock-modify-limit',
  templateUrl: './quick-actions-lock-un-lock-modify-limit.component.html',
  styleUrls: ['./quick-actions-lock-un-lock-modify-limit.component.scss']
})
export class QuickActionsLockUnLockModifyLimitComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  displayTable:boolean = false;
  customerInfo: string = '';
  completeCustomerInfo: ExceptionalCustomer;
  completeCustomerInfoForLimitUpdate: ACustomersUpdateLimit[] = [];
  nothingToSee:boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {typeOfAction: 'lock' | 'unlock' | 'modify limit'},
    public utils: UtilityFuncsService,
    private userservice: UserService,
    private dialog: MatDialog,
    private transactionservice: TransactionsService
  ) { }

  ngOnInit(): void {
    
  }

  startSeachingForCustomerInfo(){
    if(this.customerInfo.length < 1){
      	this.utils.errorSnackBar('Please enter a 10 digit customer account', 'close');
      return;
    }
      this.displayTable = true;
      console.log(this.data.typeOfAction);
      this.data.typeOfAction == 'modify limit' ? this.fetchUserForLimitUpdate() : this.fetchUserDetailsByAcctNumber(this.customerInfo);
  }

  async fetchUserDetailsByAcctNumber(accountNumber: string){
     this.nothingToSee = false;
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

  fetchUserForLimitUpdate(){
    this.nothingToSee = false;
    const pObs: PartialObserver<ACustomersUpdateLimit[]> = {
      next : val => {
        console.log(val);
        this.isLoading = false;
        this.completeCustomerInfoForLimitUpdate = val;
        if(this.completeCustomerInfoForLimitUpdate.length < 1) this.nothingToSee = true;
      },
      error: err => {
        console.log(err);
        this.nothingToSee = true;
      }

    }
    this.transactionservice.searchForAUserToModifyLimit(this.customerInfo).subscribe(pObs)
  }

  updateLimit(customer: ACustomersUpdateLimit){
    const reformedCustomer: ACustomerTransactionLimit = {
      user_id: parseInt(customer.customerid as string) ?? 0,
      username: customer.username,
      trans_type: customer.transtype,
      transactiontype: customer.transtype == 1 ? 'Globus to Globus' : 'Tier 3 NIP',
      daily_limit: customer.dailylimit,
      status: null,
      token: customer.token
    }
    this.dialog.closeAll()
    const dialog = this.dialog.open(UpdateACustomersLimitComponent, {
      width: '60vw',
      height: '70vh',
      panelClass: 'transactionLimitUpdate',
      data: {
        customer: reformedCustomer,
      }
    })
    dialog.afterClosed().subscribe(
      val => console.log(val),
      // err => console.log(err)
    )
  }

  // fetchUserDetailsByAccountForUpdatingLimit(){

  // }

  launchAppropriateModal(completeCustomerInfo: ExceptionalCustomer){
    console.log(completeCustomerInfo);
    this.utils.showCustomerInfoModal(completeCustomerInfo as unknown as ACustomer );
  }

  ngOnDestroy(): void {
      this.nothingToSee = false;
      this.completeCustomerInfoForLimitUpdate = []
      this.completeCustomerInfo = undefined;
  }

}
