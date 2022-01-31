import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { AirtimeTransactions, BankOperation, BillsTransaction, FullBillsTransactionsList, FullTransactionDetailsForUSSDMobileAndIbank, FullTransactionListForAirtime, InformationForRetailDateRange, MobileTransactionsFormat, SuccessfulFetchingOfMobileTrans, SuccessfulGetAllUsers, TransactionToLoad, User, USSDMobileAndIbank } from 'src/app/models/generalModels';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { UserService } from 'src/app/services/user.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';

@Component({
  selector: 'app-general-transactions',
  templateUrl: './general-transactions.component.html',
  styleUrls: ['./general-transactions.component.scss']
})
export class GeneralTransactionsComponent implements OnInit {
  transactions: MobileTransactionsFormat[] = [];
  ussdIbankAndMobileTransactions: Array<USSDMobileAndIbank>  = [];
  airtimeTransactions: AirtimeTransactions[] = [];
  billsTransactionsList: BillsTransaction[] = [];
  mobileAccounts: User[] = [];
  channelType: BankOperation = 'mobile';
  tableType: 'MRUB' | 'Airtime' | 'Bills' | 'Mobile Accts' = 'MRUB';
  totalTransactions: number = 0;
  info: InformationForRetailDateRange = {
    labelText: 'Select Period:',
    buttonText: 'Fetch',
    sortingIcon: false,
    extraButtonClasses: ['px-10']
  }
  isLoading: boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TransactionToLoad,
    private dialog: MatDialog,
    private dService: DashboardService,
    private userservice: UserService,
    public utils: UtilityFuncsService,

  ) { }

  ngOnInit(): void {
     this.fetchAccordingToInstruction();
  }

  openCustomerDetailsInfoModal(event: Event, acct: User){
    this.dialog.closeAll();
    this.utils.showCustomerInfoModal(event, acct);
  }


  fetchAccordingToInstruction(){
    const instruction = this.data.transactions;
  
    switch(instruction){
      case 'mobile app transactions':
        this.mobileTransactions(instruction);  
      break;
      case 'ussdpay':
      case 'mobile':
      case 'ibank':
      this.fetchAndDisplayFullMobileAppUssdAndIbankTransactions(instruction)
      this.channelType = instruction;
      break;
      case 'airtime transactions':
      this.fetchFullListOfAirtimeTransactions(instruction);
      this.channelType = instruction;
      this.tableType = 'Airtime';
      break;
      case 'bills transactions':
      this.fetchBillsTransactions(instruction);
       this.tableType = "Bills";
       this.channelType = instruction;
      break;
      case 'mobile accounts':
        this.tableType = 'Mobile Accts';
        this.channelType = instruction;
        this.fetchMobileAccounts(instruction);
      break;
    }
  }

  mobileTransactions(instruction: string){
    const pObs : PartialObserver<SuccessfulFetchingOfMobileTrans> = {
      next: val => {
        this.isLoading = false;
        this.transactions = val.data;
        console.log(this.transactions); 
      },
      error: err => {
        console.log(err);
        this.utils.errorSnackBar(`Error fetching ${instruction}`, 'close');
      
      }
    }

    this.dService.getMobileTransactions().subscribe(pObs);
  }

  fetchAndDisplayFullMobileAppUssdAndIbankTransactions(instruction: BankOperation){
    const pObs: PartialObserver<FullTransactionDetailsForUSSDMobileAndIbank> = {
      next: val => {
        this.ussdIbankAndMobileTransactions = val.data;
        this.totalTransactions = val.totalRecords
        this.isLoading = false;
        this.utils.successSnackBar('Fetched Records Successfully', 'close');
      },
      error: err => {
        console.log(err);
        this.utils.errorSnackBar(`Error fetching ${instruction.toLocaleUpperCase()} Records`, 'close');
      }
    }
    this.dService.getTransactions({pageSize: "10", pageNumber: "1", channel: instruction})
    .subscribe(pObs);
  }


  fetchFullListOfAirtimeTransactions(instruction: string){
    const pObs: PartialObserver<FullTransactionListForAirtime> = {
      next: val => {
        this.airtimeTransactions = val.data;
        this.totalTransactions = val.totalRecords
        this.isLoading = false;
        this.utils.successSnackBar('Fetched Records Successfully', 'close');
      },
      error: err => {
        console.log(err);
        this.utils.errorSnackBar(`Error fetching ${instruction.toLocaleUpperCase()} Records`, 'close');
      }
    }
    this.dService.getFullAirtimeTransactionsList({pageSize: "10", pageNumber: "1"})
    .subscribe(pObs);
  }

 

  fetchBillsTransactions(instruction: string){
    const pObs: PartialObserver<FullBillsTransactionsList> = {
      next: val => {
        this.billsTransactionsList = val.data.map(elem => ({...elem, category: this.utils.appropriateCategory(elem)}));;
        this.totalTransactions = val.totalRecords
        this.isLoading = false;
        this.utils.successSnackBar('Fetched Records Successfully', 'close');
      },
      error: err => {
        console.log(err);
        this.utils.errorSnackBar(`Error fetching ${instruction.toLocaleUpperCase()} Records`, 'close');
      }
    }
    this.dService.getFullBillsTransactionsList({pageSize: "10", pageNumber: "1"})
    .subscribe(pObs);
  }


  fetchMobileAccounts(instruction: string){
    const pObs: PartialObserver<SuccessfulGetAllUsers> = {
      next : async (val) => {
        const {data, pageSize} = val;
        this.mobileAccounts = data.map(elem => ({...elem, showActions: false}));
        this.totalTransactions = val.totalRecords;
        this.utils.successSnackBar('Fetched Records Successfully', 'close');
        this.isLoading = false;
      },
      error: error => {
        this.utils.errorSnackBar(`Error fetching ${instruction.toLocaleUpperCase()} Records`, 'close');
        console.log(error);
      }
    }
    this.userservice.getAllUsers(
      {pageNumber: 1, pageSize: 50}
    ).subscribe(pObs)
  }


  showActions(event: Event,transaction: User){
    const circlAction = event.target as HTMLElement;
    const tr: NodeListOf<HTMLTableRowElement> = document.querySelectorAll('tr.hightened');
    
    if(tr.length > 0){
      const closestTr = circlAction.closest('tr') as HTMLTableRowElement;
      if( closestTr.classList.contains('hightened') ){
        closestTr.classList.remove('hightened');
        transaction.showActions = false;
        return;
      }
      closestTr.classList.add('hightened');
      // nextElementSibling.style.top = `${screenY -80}px`;
      transaction.showActions = true;
    }else{
      const closestTr = circlAction.closest('tr') as HTMLTableRowElement;
      if(closestTr.classList.contains('hightened')){
        closestTr.classList.remove('hightened');
        transaction.showActions = false;
        return;
      }
      closestTr.classList.add('hightened');
      transaction.showActions = true;
    }
    
  }
}
