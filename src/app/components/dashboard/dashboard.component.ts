import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  totalTransactionRecords : number  = 0;
  totalAccountRecords : number  = 0;
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
    private datePipe: DatePipe,
    private dialog: MatDialog, public utils: UtilityFuncsService, 
    private dService: DashboardService) { }

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
        this.totalTransactionRecords = this.totalMobileAppTransactions + this.totalRibRecordsTransactions + this.totalUssdRecordsTransactions + this.airtimeCount + this.billsCount;
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

      this.totalAccountRecords = this.totalNumberOfAccounts + this.totalMobileRecords + this.totalRibRecords + this.totalUssdRecords;
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

  handleEmittedDateRanges(event: {dates: FormGroup, event: Event}){
    this.branchAcctsActiveAcctsInactiveAcctsAreLoading = true;
    this.transactionsAreLoading = true;
    this.filterAccountRecordsByDate(event);
    this.filterTransactionRecordsByDate(event);   
  }

  filterAccountRecordsByDate(event: {dates: FormGroup, event: Event}){
    const {value} = event.dates;
    const {target: btn} = event.event;
    const prevText = (btn as HTMLButtonElement).textContent;
    this.utils.loading4button(btn as HTMLButtonElement, 'yes', 'Fetching...');
    const convertedDates: string[] = [];
    const rawDates : Date[] = []
    Object.values(value).forEach(elem => {
      rawDates.push(elem as Date);
      const date = this.datePipe.transform(elem as string, 'dd/MM/YYYY') as string;
      convertedDates.push(date);
    });
    const pObs: PartialObserver<SuccessfullFetchingOfDashboardSummaries> = {
      next: val => {
        if(val.message != null && (val.message as string).includes('Your session has expired')){
          this.utils.errorSnackBar(val.message, 'close');
          return;
        }
 
        const {totalMobileRecords, totalRibRecords, totalUssdRecords, totalActiveAccounts, totalInActiveAccounts} = val.retailBackend;       
        this.totalNumberOfAccounts = (totalActiveAccounts ?? 0) + (totalInActiveAccounts ?? 0);
        this.totalMobileRecords = totalMobileRecords;
        this.totalRibRecords = totalRibRecords;
        this.totalUssdRecords = totalUssdRecords;
        this.accountAccounts = totalActiveAccounts ?? 0;
        this.inActiveAccounts = totalInActiveAccounts ?? 0,
        this.utils.loading4button(btn as HTMLButtonElement, 'done', prevText as string);
        this.utils.successSnackBar(`Fetched Account records from ${rawDates.map(elem => this.datePipe.transform(elem, 'MMM d, y')).join(' to ')}`, 'close');
        this.branchAcctsActiveAcctsInactiveAcctsAreLoading = false;
      },
      error: console.error
    }
    const [startDate, endDate] = convertedDates;
    this.dService.getAccountsByDateRange({startDate, endDate}).subscribe(pObs)
  }

  filterTransactionRecordsByDate(event: {dates: FormGroup, event: Event}){
    // this.transactionsAreLoading = true;
    const {value} = event.dates;
    const {target: btn} = event.event;
    const prevText = (btn as HTMLButtonElement).textContent;
    this.utils.loading4button(btn as HTMLButtonElement, 'yes', 'Fetching...');
    const convertedDates: string[] = [];
    const rawDates : Date[] = []
    Object.values(value).forEach(elem => {
      rawDates.push(elem as Date);
      const date = this.datePipe.transform(elem as string, 'dd/MM/YYYY') as string;
      convertedDates.push(date);
    });
    const pObs: PartialObserver<SuccessfullFetchingOfDashboardSummaries> = {
      next: val => {
        if(val.message != null && (val.message as string).includes('Your session has expired')){
              this.utils.errorSnackBar(val.message, 'close');
          return;
        }
        const{ totalMobileRecords, totalAirtmeSum, totalBillsCount, totalBillsSum, totalAirtimeCount, totalSumMobileTransaction, totalRibRecords,totalSumRibTransaction, totalUssdRecords,  totalSumUssdTransaction } = val.retailBackend;
        this.totalMobileAppTransactions = totalMobileRecords;
        this.totalSumMobileTransaction = isNaN(parseFloat(totalSumMobileTransaction)) ? 0 : parseFloat(totalSumMobileTransaction);
        this.totalRibRecordsTransactions = totalRibRecords;
        this.totalSumRibTransaction = isNaN(parseFloat(totalSumRibTransaction)) ? 0 : parseFloat(totalSumRibTransaction);
        this.totalUssdRecordsTransactions = totalUssdRecords;
        this.totalSumUssdTransaction = isNaN(parseFloat(totalSumUssdTransaction)) ? 0 : parseFloat(totalSumUssdTransaction);
        this.airtimeSum = isNaN(parseFloat(totalAirtmeSum as string)) ? 0 : parseFloat(totalAirtmeSum as string);
        this.airtimeCount = totalAirtimeCount as number;
        this.billsCount  = totalBillsCount as number;
        this.billsSum = isNaN(parseFloat(totalBillsSum as string)) ? 0 : parseFloat(totalBillsSum as string);
        this.utils.loading4button(btn as HTMLButtonElement, 'done', 'Fetch');
        this.utils.successSnackBar(`Got Transaction records from ${rawDates.map(elem => this.datePipe.transform(elem, 'MMM d, y')).join(' to ')}`, 'close');
        this.transactionsAreLoading = false;
      },
      error: console.error
    }
    const [startDate, endDate] = convertedDates;
    this.dService.getTransactionsByDateRange({startDate, endDate}).subscribe(pObs)
  }
  
 

}
