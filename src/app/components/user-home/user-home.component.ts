import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Observable, of, PartialObserver } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, pluck, switchMap } from 'rxjs/operators';
import { LoggedInStaffRole } from 'src/app/models/authModel';
import { ComponentNamesInThisProject, InformationForRetailDateRange,SuccessfulGetAllUsers, User } from 'src/app/models/generalModels';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { UserService } from 'src/app/services/user.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit, AfterViewInit {
  componentInView: ComponentNamesInThisProject | undefined;
  role: LoggedInStaffRole | undefined =  undefined;
  fadeApproval: boolean = false;
  showLockAProfileButton: boolean = false;
  info: InformationForRetailDateRange = {
    labelText: 'Filter Using:',
    buttonText: 'Filter Table',
    buttonWidth: '9rem',
    labelTextColor: '#003366',
    fontFamily: 'Campton Book',
    fontWeight: '400',
    extraButtonClasses: ['px-5']
  }
  // informationForSearchComp:  searchCompRequiredInfo | undefined = undefined
  constructor(
    private router: Router, 
    private userservice:UserService, 
    private broadCastService: BroadcastService,
    private utils: UtilityFuncsService,
    private datePipe: DatePipe) { 
  
    }

  ngOnInit(): void {
    this.role = JSON.parse(sessionStorage.getItem('role') as string) as LoggedInStaffRole;
    this.role.role == 'INITIATOR' ? this.fadeApproval = true : this.fadeApproval =  false;
  }

  ngAfterViewInit(): void {}

  getComponentInDisplay(event: any){
   this.componentInView = (event as Component & Object).constructor.name as ComponentNamesInThisProject;
  }

  fetchDataUsingSearchQuery(event: Event){
       let inputVal = event instanceof PointerEvent ? ((event.target as HTMLElement).previousElementSibling as HTMLInputElement).value : (event.target as HTMLInputElement).value;
       if(isNaN(parseInt(inputVal))){
        this.runSearchUsingUsername(inputVal);
        return;
       }
       this.runSearchUsingAcctNumber(inputVal);
  }

  runSearchUsingUsername(valToSearchFor: string){
    const pObs: PartialObserver<Array<Partial<User>>> = {
      next: val => {
        console.log(val);
        this.broadCastService.communicateSearchResultsToListeners({
          component: this.componentInView as ComponentNamesInThisProject,
          data: val as User[]  // this is not really a User, it is a partial User as returned from the server. Take Note.
        })
      },
      error: err => console.log(err)
    };
    this.userservice.searchUsersActiveAndLockedUsersByUsername(valToSearchFor)
    .pipe(
      switchMap(val => of(val))
    )
    .subscribe(pObs)
  }

  runSearchUsingAcctNumber(accToSearch: string){
    const pObs: PartialObserver<Array<Partial<User>>> = {
      next: val => {
        console.log(val);
        this.broadCastService.communicateSearchResultsToListeners({
          component: this.componentInView as ComponentNamesInThisProject,
          data: val as User[]  // this is not really a User, it is a partial User as returned from the server. Take Note.
        })
      },
      error: err => console.log(err)
    };
    this.userservice.searchUsersActiveAndLockedUsersByAcctNumber(accToSearch)
    .pipe(
      switchMap(val => of([val]))
    )
    .subscribe(pObs)
  }


  setSelected(event: Event){
    const htmlDiv = event.target as HTMLDivElement;
    const {textContent, id} = htmlDiv;
    const toggleGroupItem: NodeListOf<HTMLDivElement> = document.querySelectorAll('.toggle_Group_item');
    toggleGroupItem.forEach(elem => elem.classList.remove('selected'));
    htmlDiv.classList.add('selected');
    console.log(textContent);
    textContent?.trim() == 'locked profiles' ? this.showLockAProfileButton = true : this.showLockAProfileButton = false;
    this.router.navigate(['dashboard', 'users', `${id}`]);
  }

  handleEvent(event: any){
    console.log(event);
  }

  fetchResults(event:{dates: FormGroup, event: Event}){
    const {start, end} = event.dates.value;
    const dates: string[] = [ this.datePipe.transform(start, 'dd/MM/YYYY') as string, this.datePipe.transform(end, 'dd/MM/YYYY') as string, ];
    // console.log(start, end);
    switch(this.componentInView){
      case 'ActiveUsersComponent':
        this.fetchResultsForActiveOrLockedUsersByDate(event.event, dates);
      break;
      case 'LockedUsersComponent':
        this.fetchResultsForActiveOrLockedUsersByDate(event.event, dates);
      break;
      default:
       this.fetchResultsWithInputParametersContainingDates(event.event, dates);
    }   
  } 
  fetchResultsWithInputParametersContainingDates(event: Event, dates: string[] ){
    const btn = event.target as HTMLButtonElement;
    const {innerHTML : prevText} = btn;
    this.utils.loading4button(btn, 'yes', 'Fetching...');
    this.userservice
    .searchUsersByDateTimeAndOtherAccDetails(dates, {pageNumber: 1, pageSize: 10})
    .subscribe(val => {
      this.broadCastService.communicateSearchResultsToListeners({
        component: this.componentInView as ComponentNamesInThisProject,
        data: val.data
      })
      // console.log(val);
      this.utils.loading4button(btn, 'done', prevText);
      this.utils.successSnackBar(`Accounts from ${dates[0]} - ${dates[1]} fetched successfully`, 'close')
    }, err => {
      console.log(err);
      this.utils.loading4button(btn, 'done', prevText);
      this.utils.errorSnackBar(`Failed to load accounts.`, 'close')
    })
  }

  fetchResultsForActiveOrLockedUsersByDate(event: Event, dates: string[]){
    const btn = event.target as HTMLButtonElement;
    const {innerHTML : prevText} = btn;
    this.utils.loading4button(btn, 'yes', 'Fetching...');
    const serviceToUse = this.componentInView == 'LockedUsersComponent' ? 'searchLockedUsersByDateDetails' : 'searchActiveUsersByDateDetails';
   ((this.userservice as any)[serviceToUse](dates, {pageNumber: 1, pageSize: 10}) as Observable<SuccessfulGetAllUsers>)
    .subscribe(val => {
      this.broadCastService.communicateSearchResultsToListeners({
        component: this.componentInView as ComponentNamesInThisProject,
        data: val.data
      })
      console.log(val);
      this.utils.loading4button(btn, 'done', prevText);
      this.utils.successSnackBar(`Accounts from ${dates[0]} - ${dates[1]} fetched successfully`, 'close')
    }, err => {
      console.log(err);
      this.utils.loading4button(btn, 'done', prevText);
      this.utils.errorSnackBar(`Failed to load accounts.`, 'close')
    })
  }

  fetchUsersBySearch(){

  }

}
