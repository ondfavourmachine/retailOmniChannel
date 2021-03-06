import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { ACustomer, BillsTransaction, User } from '../models/generalModels';
import { CustomerInformationComponent } from '../reusables/customer-information/customer-information.component';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityFuncsService {

  constructor(
    private _snackBar: MatSnackBar, 
    private dialog: MatDialog,
    private userservice: UserService
  ) { }

  appropriateCategory = (elem: BillsTransaction) :string => {
    const{sub_billers} = elem;
    if(sub_billers.trim().toLowerCase().includes('electric')){
      return 'Electricity';
    }
    else if(sub_billers.trim().toLowerCase().includes('dstv')){
      return 'Cable Tv';
    }
    else{
      return 'Mobile Data';
    }   
  }

  formatNumber(value: any){
    return new Intl.NumberFormat('en-us').format(parseInt(value));
  }

  removeCommasAndReturnANumber(value: string){
    const valToReturn = value.replace(/,/g, '');
    return isNaN(parseInt(valToReturn)) ? 0 : parseInt(valToReturn);
  }

  formatNumberIntoMoney(val: number){
    const opt: any = {notation: "compact",compactDisplay: "short"};
   return new Intl.NumberFormat('en-us', opt).format(val)
  }

  loading4button(
    button: HTMLButtonElement | HTMLAnchorElement,
    apiCall: 'yes' | 'done',
    displayString?: string
  ) {
    if(button instanceof HTMLButtonElement){
        switch (apiCall) {
        case "yes":
          button.innerText = "";
          button.disabled = true;
          button.innerHTML = `${displayString}  <i class="fa fa-sync fa-spin ml-1"></i>`;
          break;
        case "done":
          button.innerHTML = "";
          button.disabled = false;
          button.innerHTML = `${displayString || "Submit"}`;
      }
    }else{
      switch (apiCall) {
        case "yes":
          button.innerText = "";
          button.style.pointerEvents = 'none';
          button.innerHTML = `${displayString}  <i class="fa fa-sync fa-spin ml-1"></i>`;
          break;
        case "done":
          button.innerHTML = "";
          button.style.pointerEvents  = 'auto';
          button.innerHTML = `${displayString || "Submit"}`;
      }
    }
   
  }

  errorSnackBar(message: string, action: string = ''){
    const config: MatSnackBarConfig = {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: "error-snackBar",
      duration: 3000
    }
    this._snackBar.open(message, action, config);
  }

  successSnackBar(message: string, action: string = '', duration?: number): void{
    const config: MatSnackBarConfig = {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: "success-snackbar",
      duration: duration || 3000
    }
    this._snackBar.open(message, action, config);
  }


  async showCustomerInfoModal(user: User | ACustomer, event?: Event, awaitingApproval?: boolean){  
    console.log(user);
    let btn, prevText;
    if(event)btn = event.target as HTMLButtonElement;
    if(btn) prevText = btn.textContent;
    if(btn)this.loading4button(btn, 'yes', 'Fetching...');
    try {
      const res = await this.userservice.getCustomerByAccountNumber((user as User).accountnumber ?? (user as ACustomer).primarY_ACCOUNT);
      console.log(res);
      const {userInfo, reg, userLogs, currentStatus} = res;
      if(btn)this.loading4button(btn, 'done', prevText as string);
      const dialog = this.dialog.open(CustomerInformationComponent, { data: {...userInfo, userLogs: userLogs, currentStatus: awaitingApproval ? 'PENDING APPROVAL' : currentStatus, reg: reg ?? null },width: '50vw', height: '90vh', panelClass: 'customerInformationComp'});
      dialog.afterClosed().subscribe(
        val => {
          if(typeof val == 'object'){
            console.log(val);
          }
        },
        err => console.log(err)
      )
    } catch (error) {
      console.log(error);
      this.errorSnackBar('Error occured while fetching information', 'close');
      if(btn)this.loading4button(btn, 'done', prevText as string);
    }
  }
}

