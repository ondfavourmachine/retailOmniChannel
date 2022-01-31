import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  NavigationEnd, Router } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { InformationForRetailDateRange, SuccessfulFetchingOfCustomersTransactionLimits } from 'src/app/models/generalModels';
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
  }

  ngAfterViewInit(): void {
    this.setSelected(undefined, false, this.currentPath == 'transactions' ? 'nip' : this.currentPath);
  }

  fetchResults(event: any){}

  handleEvent(event: any){

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
