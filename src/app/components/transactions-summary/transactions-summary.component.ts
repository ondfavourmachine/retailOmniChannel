import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AirtimeTransactions, BankOperation, BillsTransaction, MobileRIBUSSDTransactions, NipTransaction, TransactionToLoad } from 'src/app/models/generalModels';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';

@Component({
  selector: 'app-transactions-summary',
  templateUrl: './transactions-summary.component.html',
  styleUrls: ['./transactions-summary.component.scss']
})
export class TransactionsSummaryComponent implements OnInit {
  summaryToShow: BankOperation = 'bills transactions';
  billsInfoToDisplay: BillsTransaction | undefined;
  mobileUSSDRIBInfoToDisplay: MobileRIBUSSDTransactions | undefined;
  nipTransactions: NipTransaction | undefined;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TransactionToLoad,
    public utils: UtilityFuncsService
  ) { }

  ngOnInit(): void {
    this.summaryToShow = this.data.transactions;
    
    switch(this.summaryToShow){
      case 'bills transactions':
      this.billsInfoToDisplay = this.data.data as BillsTransaction;
      this.billsInfoToDisplay.amount
      break;
      case 'mobile':
      case 'ussdpay':
      case 'ibank':
        this.mobileUSSDRIBInfoToDisplay = this.data.data as MobileRIBUSSDTransactions;
        console.log(this.mobileUSSDRIBInfoToDisplay, this.summaryToShow);
      break;
      case 'nip transactions':
        this.nipTransactions = this.data.data as NipTransaction;
        console.log(this.nipTransactions, this.summaryToShow);
      break;
      
    }
 
    
  }

}
