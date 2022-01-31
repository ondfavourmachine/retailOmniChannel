import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BankOperation, MobileRIBUSSDTransactions, TransactionToLoad } from 'src/app/models/generalModels';
import { TransactionsService } from 'src/app/services/transactions.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';
import { TransactionsSummaryComponent } from '../transactions-summary/transactions-summary.component';

@Component({
  selector: 'app-mobiletransactions',
  templateUrl: './mobiletransactions.component.html',
  styleUrls: ['./mobiletransactions.component.scss']
})
export class MobiletransactionsComponent implements OnInit {
  mobiletransactions: MobileRIBUSSDTransactions[] = [];
  isLoading: boolean = true;
  constructor(
    private dialog: MatDialog,
    public utils: UtilityFuncsService,
    private transactionservice: TransactionsService
    ) { }


  ngOnInit(): void {
    this.fetchTransactionsAccordingToTransaction({pageSize:10, pageNumber: 1, channel: 'mobile'})
  }

  fetchTransactionsAccordingToTransaction(pageInfo: {
    pageNumber: number,
    pageSize: number,
    channel: BankOperation
  }){
    this.transactionservice.getMobileUSSDRIBTransactions(
      pageInfo
    )
    .subscribe(val => {
      this.mobiletransactions = val.data;
      this.isLoading = false;
      this.utils.successSnackBar(`${pageInfo.channel} transactions was successfully selected!`,'close');
    }, err =>{
      console.log(err);
      this.utils.errorSnackBar(`Error selecting ${pageInfo.channel} transactions`,'close')
    })
  }

  showSummary(trans: MobileRIBUSSDTransactions){
    const data: TransactionToLoad = {
      transactions: 'mobile',
      totalMoney: '',
      data: trans,
    }
    const dialog =  this.dialog.open(
      TransactionsSummaryComponent, 
      {
        width: '45vw', height: 'auto', panelClass: 'transactionsSummaryComp',
        data,
     });
  }

}
