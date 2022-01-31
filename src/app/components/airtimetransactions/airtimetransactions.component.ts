import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PartialObserver } from 'rxjs';
import { AirtimeTransactions, FullTransactionListForAirtime, TransactionToLoad } from 'src/app/models/generalModels';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';
import { TransactionsSummaryComponent } from '../transactions-summary/transactions-summary.component';

@Component({
  selector: 'app-airtimetransactions',
  templateUrl: './airtimetransactions.component.html',
  styleUrls: ['./airtimetransactions.component.scss']
})
export class AirtimetransactionsComponent implements OnInit {
  airtimeTransactions: AirtimeTransactions[] = [];
  isLoading: boolean = true;
  constructor(
    private dService: DashboardService,
    private utils: UtilityFuncsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchFullListOfAirtimeTransactions('airtime transactions')
  }

  fetchFullListOfAirtimeTransactions(instruction: string){
    const pObs: PartialObserver<FullTransactionListForAirtime> = {
      next: val => {
        this.airtimeTransactions = val.data;
        this.isLoading = false;
        this.utils.successSnackBar(`Fetched ${instruction} Records Successfully`, 'close');
      },
      error: err => {
        console.log(err);
        this.utils.errorSnackBar(`Error fetching ${instruction.toLocaleUpperCase()} Records`, 'close');
      }
    }
    this.dService.getFullAirtimeTransactionsList({pageSize: "10", pageNumber: "1"})
    .subscribe(pObs);
  }

 

}
