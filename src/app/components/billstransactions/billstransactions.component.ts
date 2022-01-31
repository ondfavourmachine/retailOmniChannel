import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PartialObserver } from 'rxjs';
import { BillsTransaction, FullBillsTransactionsList, TransactionToLoad } from 'src/app/models/generalModels';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';
import { TransactionsSummaryComponent } from '../transactions-summary/transactions-summary.component';

@Component({
  selector: 'app-billstransactions',
  templateUrl: './billstransactions.component.html',
  styleUrls: ['./billstransactions.component.scss']
})
export class BillstransactionsComponent implements OnInit {
  billsTransactionsList: BillsTransaction[] = [];
  isLoading: boolean = true;
  constructor(
    private dialog: MatDialog,
    private utils: UtilityFuncsService, private dService: DashboardService) { }

  ngOnInit(): void {
    this.fetchBillsTransactions('bills transactions')
  }


  fetchBillsTransactions(instruction: string){
    const pObs: PartialObserver<FullBillsTransactionsList> = {
      next: val => {
        this.billsTransactionsList = val.data.map(elem => ({...elem, category: this.utils.appropriateCategory(elem)}));;
       
        this.isLoading = false;
        this.utils.successSnackBar(`Fetched ${instruction} Records Successfully`, 'close');
      },
      error: err => {
        console.log(err);
        this.utils.errorSnackBar(`Error fetching ${instruction.toLocaleUpperCase()} Records`, 'close');
      }
    }
    this.dService.getFullBillsTransactionsList({pageSize: "10", pageNumber: "1"})
    .subscribe(pObs);
  }

   showSummary(trans: BillsTransaction){
    const data: TransactionToLoad = {
      transactions: 'bills transactions',
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
