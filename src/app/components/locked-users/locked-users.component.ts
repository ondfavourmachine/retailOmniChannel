import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PartialObserver, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoggedInStaffRole } from 'src/app/models/authModel';
import { AccountStatus, ComponentNamesInThisProject, SearchResultFromDateRange, SuccessfulGetAllUsers, User } from 'src/app/models/generalModels';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { UserService } from 'src/app/services/user.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';
import { InitiateLockOrUnLockComponent } from '../initiate-lock-or-un-lock/initiate-lock-or-un-lock.component';

@Component({
  selector: 'app-locked-users',
  templateUrl: './locked-users.component.html',
  styleUrls: ['./locked-users.component.scss']
})
export class LockedUsersComponent implements OnInit {
  isLoading: boolean=  true;
  lockedUsers: User[] = [];
  role: LoggedInStaffRole | undefined;
  destroySub: Subscription | undefined;
  myComponentName: ComponentNamesInThisProject | undefined;
  constructor(
    private userservice: UserService,
    private broadCastService: BroadcastService,
    public utils: UtilityFuncsService,
    private dialog: MatDialog
  ) {   this.myComponentName = (this as Object).constructor.name as ComponentNamesInThisProject; }

  ngOnInit(): void {
    this.role = JSON.parse(sessionStorage.getItem('role') as string) as LoggedInStaffRole;
    const pObs: PartialObserver<SearchResultFromDateRange> = {
      next: val => this.handleSearchResultsBroadCasted(val)
    }
    this.destroySub = this.broadCastService.broadCastDataListeners$
     .pipe(
       filter(elem => elem.component != null && elem.component == this.myComponentName) 
     )
     .subscribe(pObs);
    this.fetchAllLockedUsers();
  }

  handleSearchResultsBroadCasted(result: SearchResultFromDateRange){
    if(result.component == this.myComponentName){
      this.lockedUsers = result.data.map(elem => ({...elem, showActions: false}));
    } 
  }


  refreshing(event: Event){
    const btn = event.target as HTMLButtonElement;
    const prevText = btn.textContent;
    this.utils.loading4button(btn, 'yes', 'Refreshing ...');
    this.fetchAllLockedUsers(btn, prevText as string)
  }

  fetchAllLockedUsers(btn?: HTMLButtonElement, prevText?: string){
    document.querySelectorAll('.toggle_Group_item').forEach(elem => elem.classList.remove('selected'));
    const pObs: PartialObserver<SuccessfulGetAllUsers> = {
      next : async (val) => {
        // console.log(val);
        const {data, pageSize} = val;
        this.lockedUsers = data.map(elem => ({...elem, showActions: false}));
        (document.getElementById('lockedProfiles') as HTMLElement).classList.add('selected');
        this.utils.successSnackBar(`${pageSize} profiles selected successfully`, `close`);
        this.isLoading = false;
        if(btn && prevText) this.utils.loading4button(btn, 'done', prevText)
      },
      error: error => {
        this.utils.errorSnackBar(`Unable to load users!`, `close`);
        console.log(error);
      }
    }
    this.userservice.getLockedUsers(
      {pageNumber: 1, pageSize: 50}
    ).subscribe(pObs)
  }

  showActions(event: Event, index: number, user: User){
    const circlAction = event.target as HTMLElement;
    const tr: NodeListOf<HTMLTableRowElement> = document.querySelectorAll('tr.hightened');
    
    if(tr.length > 0){
      const closestTr = circlAction.closest('tr') as HTMLTableRowElement;
      if( closestTr.classList.contains('hightened') ){
        closestTr.classList.remove('hightened');
        user.showActions = false;
        return;
      }
      closestTr.classList.add('hightened');
      // nextElementSibling.style.top = `${screenY -80}px`;
      user.showActions = true;
    }else{
      const closestTr = circlAction.closest('tr') as HTMLTableRowElement;
      if(closestTr.classList.contains('hightened')){
        closestTr.classList.remove('hightened');
        user.showActions = false;
        return;
      }
      closestTr.classList.add('hightened');
      user.showActions = true;
    }
    
  }


  intiateLockOrUnLock(string: 'initiate Lock' | 'initiate Unlock', user: User){
    // this.dialog.closeAll();
    const dialog = this.dialog.open(
      InitiateLockOrUnLockComponent, 
      {width:'40vw', height: 'auto', panelClass: 'initiateLockOrUnLock' , data: {typeOfAction: string, user: user}});
      dialog.afterClosed().subscribe(
        val => {
          this.fetchAllLockedUsers();
        }
      )
  }

  returnAppropriateStatus(status: AccountStatus){
      return status.toLowerCase().includes('customer-center') || status.toLowerCase().includes('user');
  }

}
