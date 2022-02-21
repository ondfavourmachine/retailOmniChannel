import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {  NavigationEnd, Router } from '@angular/router';
import { Observable, PartialObserver } from 'rxjs';
import { LoggedInStaffRole } from 'src/app/models/authModel';
import { ComponentNamesInThisProject, InformationForRetailDateRange, SuccessfulFetchingOfCustomersTransactionLimits } from 'src/app/models/generalModels';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { UserService } from 'src/app/services/user.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';
import { GeneralModifyLimitComponent } from '../general-modify-limit/general-modify-limit.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, AfterViewInit {
  currentPath: string = '';
  fadeApproval: boolean = false;
  role: LoggedInStaffRole | undefined
  componentInView:ComponentNamesInThisProject | undefined;
  info: InformationForRetailDateRange = {
    labelText: 'Filter Using:',
    buttonText: 'Filter Table',
    buttonWidth: '9rem',
    labelTextColor: '#003366',
    fontFamily: 'Campton Book',
    fontWeight: '400',
    extraButtonClasses: ['px-5']
  }
  constructor(
    private router: Router, 
    public utils: UtilityFuncsService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private broadCastService: BroadcastService,
    public transactionservice: TransactionsService
    ) { 
    // this.currentPath = router.url.split('/')[router.url.split('/').length - 1]; 
    router.events.subscribe(eve => {
      if(eve instanceof NavigationEnd){
        const len = eve.url.split('/').length;
        this.currentPath = eve.url.split('/')[len - 1];
      }
    })
  }

  ngOnInit(): void {
    this.role = JSON.parse(sessionStorage.getItem('role') as string) as LoggedInStaffRole;
    this.role.role == 'INITIATOR' ? this.fadeApproval = true : this.fadeApproval =  false;
  }

  getComponentInDisplay(event: any){
    this.componentInView = (event as Component & Object).constructor.name as ComponentNamesInThisProject;
   }

  ngAfterViewInit(): void {
    this.setSelected(undefined, false, this.currentPath == 'transactions' ? 'nip' : this.currentPath);
  }

  fetchResults(event:{dates: FormGroup, event: Event}){
    const {start, end} = event.dates.value;
    const dates: string[] = [ this.datePipe.transform(start, 'dd/MM/YYYY') as string, this.datePipe.transform(end, 'dd/MM/YYYY') as string, ];
    console.log(start, end, this.componentInView);
    switch(this.componentInView){
      case 'NiptransactionsComponent':
      this.fetchResultsWithInputParametersContainingDates(event.event, dates, 'searchNipTransByDateTimeAndOtherAccDetails');
      break;
      case 'LockedUsersComponent':
      break;
      default:
      
    }   
  }

  handleEvent(event: any){

  }

  fetchResultsWithInputParametersContainingDates(event: Event, dates: string[], serviceToUse: string){
    const btn = event.target as HTMLButtonElement;
    const {innerHTML : prevText} = btn;
    this.utils.loading4button(btn, 'yes', 'Fetching...');
    ((this.transactionservice as any)[serviceToUse](dates, {pageNumber: 1, pageSize: 10}) as Observable<any>)
    .subscribe(val => {
      // this.broadCastService.communicateSearchResultsToListeners({
      //   component: this.componentInView as ComponentNamesInThisProject,
      //   data: val.data
      // })
      console.log(val);
      this.utils.loading4button(btn, 'done', prevText);
      this.utils.successSnackBar(`Nip Transactions from ${dates[0]} - ${dates[1]} fetched successfully`, 'close')
    }, err => {
      console.log(err);
      this.utils.loading4button(btn, 'done', prevText);
      this.utils.errorSnackBar(`Failed to load accounts.`, 'close')
    })
  }

setSelected(event?: Event, dontRoute?: boolean, targetElement?: string){
  // console.log(this.currentPath);
   try {
    const htmlDiv = event?.target as HTMLDivElement;
    const {textContent, id} = htmlDiv;
    const toggleGroupItem: NodeListOf<HTMLDivElement> = document.querySelectorAll('.toggle_Group_item');
    toggleGroupItem.forEach(elem => elem.classList.remove('selected'));
    htmlDiv.classList.add('selected');
    console.log(textContent);
    dontRoute ? null : this.router.navigate(['dashboard', 'transactions', `${id}`]);
   } catch (error) {
    const toggleGroupItem: NodeListOf<HTMLDivElement> = document.querySelectorAll('.toggle_Group_item');
    toggleGroupItem.forEach(elem => elem.classList.remove('selected'));
    const found = Array.from(toggleGroupItem).find(elem => elem.id == targetElement);
    found?.classList.add('selected');
   }
  }


  fetchAllUsersForLimitModification(event: Event){
    const btn = event.target as HTMLButtonElement;
    const {innerHTML } = btn;
    const prevText = innerHTML;
    const pObs: PartialObserver<SuccessfulFetchingOfCustomersTransactionLimits> = {
      next: val => {
        // console.log(val.data);
        this.dialog.open(GeneralModifyLimitComponent, {
          width: '70vw',
          height: '90vh',
          panelClass: 'generalDisplayForModifyingLimit',
          data: {
            customers: val.data,
          }
        })
        this.utils.loading4button(btn, 'done', prevText);
      },
      error: err => console.error(err),
    }
    this.utils.loading4button(btn, 'yes', 'Fetching users...');
    this.transactionservice.getTransactionLimitForAllCustomers({pageNumber: 1, pageSize: 10})
    .subscribe(pObs);
  }

}
