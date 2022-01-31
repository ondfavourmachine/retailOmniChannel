import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BankOperation, MobileRIBUSSDTransactions, TransactionToLoad } from 'src/app/models/generalModels';
import { TransactionsService } from 'src/app/services/transactions.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';
import { TransactionsSummaryComponent } from '../transactions-summary/transactions-summary.component';

@Component({
  selector: 'app-ribtransactions',
  templateUrl: './ribtransactions.component.html',
  styleUrls: ['./ribtransactions.component.scss']
})
export class RibtransactionsComponent implements OnInit {
  ribTransactions: MobileRIBUSSDTransactions[] = [];
  isLoading: boolean = true;
  constructor(
   private transactionservice: TransactionsService,
   public utils: UtilityFuncsService,
   private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchTransactionsAccordingToTransaction({pageSize:10, pageNumber: 1, channel: 'ibank'})
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
      this.ribTransactions = val.data;
      this.isLoading = false;
      this.utils.successSnackBar(`${pageInfo.channel} transactions was successfully selected!`,'close');
    }, err =>{
      console.log(err);
      this.utils.errorSnackBar(`Error selecting ${pageInfo.channel} transactions`,'close')
    })
  }


  showSummary(trans: MobileRIBUSSDTransactions){
    const data: TransactionToLoad = {
      transactions: 'ibank',
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
