import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PartialObserver, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ComponentNamesInThisProject, SearchResultFromDateRange, SuccessfulGetAllUsers, User } from 'src/app/models/generalModels';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { UserService } from 'src/app/services/user.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';
import { InitiateLockOrUnLockComponent } from '../initiate-lock-or-un-lock/initiate-lock-or-un-lock.component';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.scss']
})
export class ActiveUsersComponent implements OnInit, OnDestroy {
  activeUsers: User[] = [];
  isLoading: boolean = true;
  destroySub: Subscription | undefined;
  myComponentName: ComponentNamesInThisProject | undefined;
  
  constructor(
    private userservice: UserService,
    private broadCastService: BroadcastService,
    public utils: UtilityFuncsService,
    private dialog: MatDialog
  ) { 
    this.myComponentName = (this as Object).constructor.name as ComponentNamesInThisProject;
  }

  refreshing(event: Event){
    const btn = event.target as HTMLButtonElement;
    const prevText = btn.textContent;
    this.utils.loading4button(btn, 'yes', 'Refreshing ...');
    this.fetchActiveUsers(btn, prevText as string)
  }

  ngOnInit(): void {
    const pObs: PartialObserver<SearchResultFromDateRange> = {
      next: val => this.handleSearchResultsBroadCasted(val)
    }
    this.destroySub = this.broadCastService.broadCastDataListeners$
     .pipe(
       filter(elem => elem.component != null && elem.component == this.myComponentName) 
     )
     .subscribe(pObs);

    // 
    this.fetchActiveUsers();
  }

  handleSearchResultsBroadCasted(result: SearchResultFromDateRange){
    if(result.component == this.myComponentName){
      this.activeUsers = result.data.map(elem => ({...elem, showActions: false}));
    } 
  }


  fetchActiveUsers(btn?: HTMLButtonElement, prevText?: string){
    document.querySelectorAll('.toggle_Group_item').forEach(elem => elem.classList.remove('selected'));
    const pObs: PartialObserver<SuccessfulGetAllUsers> = {
      next : async (val) => {
        // console.log(val);
        const {data, pageSize} = val;
        this.activeUsers = data.map(elem => ({...elem, showActions: false}));
        (document.getElementById('activeUsers') as HTMLElement).classList.add('selected');
        this.utils.successSnackBar(`${pageSize} profiles selected successfully`, `close`);
        this.isLoading = false;
        if(btn && prevText) this.utils.loading4button(btn, 'done', prevText)
      },
      error: error => {
        this.utils.errorSnackBar(`Unable to load users!`, `close`);
        console.log(error);
      }
    }
    this.userservice.activeUsers(
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
    const dialog = this.dialog.open(
      InitiateLockOrUnLockComponent, 
      {width:'40vw', height: 'auto', panelClass: 'initiateLockOrUnLock' , data: {typeOfAction: string, user: user}});
      dialog.afterClosed().subscribe(
      val => {
        this.fetchActiveUsers();
      }
    )
  }

  
 ngOnDestroy(): void {
  if(this.destroySub) this.destroySub.unsubscribe();
} 

}
