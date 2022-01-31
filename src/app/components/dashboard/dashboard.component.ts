import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { forkJoin, PartialObserver } from 'rxjs';
import { AccountTypesInGlobus, BankOperation, InformationForRetailDateRange, searchCompRequiredInfo, SuccessfulAirtimeAndBills, SuccessfullFetchingOfDashboardSummaries, TransactionToLoad } from 'src/app/models/generalModels';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { UserService } from 'src/app/services/user.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';
import { GeneralTransactionsComponent } from '../general-transactions/general-transactions.component';
// import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  transactionsAreLoading: boolean = true;
  branchAcctsActiveAcctsInactiveAcctsAreLoading: boolean = true;
  channelRecordsIsLoading: boolean = true;
  accountAccounts: number = 0;
  inActiveAccounts: number = 0;
  totalMobileRecords: number = 0;
  totalRibRecords: number = 0;
  totalNumberOfAccounts: number = 0;
  totalUssdRecords: number = 0;
  airtimeSum: number = 0;
  billsSum: number = 0;
  airtimeCount: number = 0;
  billsCount:number = 0;
  totalMobileAppTransactions: number = 0;
  totalRibRecordsTransactions: number = 0;
  totalUssdRecordsTransactions: number = 0;
  totalSumMobileTransaction: number = 0;
  totalSumRibTransaction: number = 0;
  totalSumUssdTransaction: number = 0;

  info: InformationForRetailDateRange = {
    labelText: 'Select Period:',
    buttonText: 'Fetch',
    extraButtonClasses: ['px-4'],
  }
  informationForSearchComp: searchCompRequiredInfo | undefined = undefined
  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog, public utils: UtilityFuncsService, private dService: DashboardService) { }

  ngOnInit(): void {
    this.fetchTransactionsFromServer();
    this.fetchChannelRecordsFromServer();
    this.fetchTotalActiveAcctsAndInactiveAcctsAndTotalBranchAccts();
  }

  showInformation(string: BankOperation, totalMoney: any){
    const trans: TransactionToLoad = {transactions: string, totalMoney};
    const dialog = this.dialog.open(GeneralTransactionsComponent, {
      data: { ...trans},
      width: '85vw', height: 'auto', maxHeight: '90vh', panelClass: 'general_transactions_modal'
    });
    
  }

  fetchTransactionsFromServer(){
    let pObs: PartialObserver<[SuccessfullFetchingOfDashboardSummaries, SuccessfulAirtimeAndBills]> = {
      next : val => {
        // console.log(val);
        const [transactions, airtimeAndBills] = val;
        if(transactions.message?.includes('expired')){
          this.utils.errorSnackBar(transactions.message, 'close');
            setTimeout(() => {
              sessionStorage.clear();
              this.router.navigate(['']);
          }, 3000);
          return;
        }
        this.totalMobileAppTransactions = transactions.retailBackend.totalMobileRecords;
        this.totalRibRecordsTransactions = transactions.retailBackend.totalRibRecords;
        this.totalUssdRecordsTransactions = transactions.retailBackend.totalUssdRecords;
        this.totalSumUssdTransaction = transactions.retailBackend.totalSumUssdTransaction;
        this.totalSumMobileTransaction = transactions.retailBackend.totalSumMobileTransaction;
        this.totalSumRibTransaction = transactions.retailBackend.totalSumRibTransaction;

        this.airtimeCount = airtimeAndBills.airtimeCount;
        this.airtimeSum = airtimeAndBills.airtimeSum;
        this.billsCount = airtimeAndBills.billsCount;
        this.billsSum = airtimeAndBills.billsSum;  
        this.transactionsAreLoading = false;
      },
      error: err => {
        console.log(err);
        this.utils.errorSnackBar('An Error occured while fetching. Please try again', 'close');
        // setTimeout(() => {
        //     sessionStorage.clear();
        //     this.router.navigate(['']);
        // }, 3000);
      }
    };
    forkJoin(
      [
        this.dService.getDashboardTransactions(),
        this.dService.getAirtimeAndBills()
      ]
    ).subscribe(pObs);
  }

  


  fetchChannelRecordsFromServer(){
    this.dService.getChannelRecords().subscribe(
      val => {
        const { totalMobileRecords, totalRibRecords, totalUssdRecords} = val.retailBackend;
        this.totalMobileRecords = totalMobileRecords;
        this.totalRibRecords = totalRibRecords;
        this.totalUssdRecords = totalUssdRecords;
        this.channelRecordsIsLoading = false;
      },
      err => console.log(err)
    )
  }

  fetchTotalActiveAcctsAndInactiveAcctsAndTotalBranchAccts(){
    const pObs: PartialObserver<AccountTypesInGlobus> = {
      next: val => {
      const  {activeAccounts, inActiveAccounts, totalNumberOfAccounts} = val;
      this.accountAccounts = activeAccounts;
      this.inActiveAccounts = inActiveAccounts,
      this.totalNumberOfAccounts = totalNumberOfAccounts;
      this.branchAcctsActiveAcctsInactiveAcctsAreLoading = false;
      },
      error: err => console.log(err)
    }
    this.userService.getTotalAccts().subscribe(pObs)
  }


  triggerDoNotDisturb(event: MatSlideToggleChange){
    // triggerDoNotDistur
  }


 

  handleEvent(event: Event){
    console.log(event);
    this.informationForSearchComp = {searchEvent: event, parentComp: 'dashboard'};
  }
  
 

}
