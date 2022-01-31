import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NipTransaction, TransactionToLoad } from 'src/app/models/generalModels';
import { TransactionsService } from 'src/app/services/transactions.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';
import { TransactionsSummaryComponent } from '../transactions-summary/transactions-summary.component';

@Component({
  selector: 'app-niptransactions',
  templateUrl: './niptransactions.component.html',
  styleUrls: ['./niptransactions.component.scss']
})
export class NiptransactionsComponent implements OnInit {
 niptransactions: NipTransaction[] = [];
 isLoading: boolean = true;
  constructor(
    public utils: UtilityFuncsService,
    private transactionservice: TransactionsService,
    private dialog: MatDialog,

    ) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }


  fetchTransactions(){
    this.transactionservice.getNipTransactions({pageSize: 10, pageNumber: 1})
    .subscribe(
      val => {
        // console.log(val);
        this.niptransactions = val.data;
        this.isLoading = false;
        this.utils.successSnackBar(`Nip transactions successfully selected`, 'close');
      }, 
      err => {
       console.log(err);  
       this.isLoading = false;
       this.utils.errorSnackBar(`Error selecting nip transactions`, 'close');
       }
      )
  }

  showSummary(trans: NipTransaction){
    const data: TransactionToLoad = {
      transactions: 'nip transactions',
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
