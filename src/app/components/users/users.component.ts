import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PartialObserver, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ACustomer, ComponentNamesInThisProject, InformationForRetailDateRange, SearchResultFromDateRange, SuccessfulGetAllUsers, User } from 'src/app/models/generalModels';
import { CustomerInformationComponent } from 'src/app/reusables/customer-information/customer-information.component';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { UserService } from 'src/app/services/user.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
   myComponentName: ComponentNamesInThisProject | undefined;
  allUsers: User[] = [];
  isLoading: boolean = true;
  destroySub : Subscription | undefined
  constructor(
    private userservice: UserService,
    private dialog: MatDialog,
    private broadCastService: BroadcastService,
    public utils: UtilityFuncsService
  ) {
    this.myComponentName = (this as Object).constructor.name as ComponentNamesInThisProject;
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
    this.fetchAllUsers();
  }

  handleSearchResultsBroadCasted(result: SearchResultFromDateRange){
    // console.log(result);
    if(result.component == this.myComponentName){
      this.allUsers = result.data.map(elem => ({...elem, showActions: false}));
      console.log(this.allUsers);
    } 
  }

  refreshing(event: Event){
    const btn = event.target as HTMLButtonElement;
    const prevText = btn.textContent;
    this.utils.loading4button(btn, 'yes', 'Refreshing ...');
    this.fetchAllUsers(btn, prevText as string)
  }
 
  fetchAllUsers(btn?: HTMLButtonElement, prevText?: string){
    this.isLoading = true;
    this.allUsers = [];
    const pObs: PartialObserver<SuccessfulGetAllUsers> = {
      next : async (val) => {
        const {data, pageSize} = val;
        this.allUsers = data.map(elem => ({...elem, showActions: false}));
        const toggleGroupItem: HTMLDivElement = Array.from(document.querySelectorAll('.toggle_Group_item')).find(elem => elem.textContent?.trim() == 'all users') as HTMLDivElement;
        toggleGroupItem.classList.add('selected');
        // console.log(val)
        this.utils.successSnackBar(`${pageSize} profiles selected successfully`, `close`);
        this.isLoading = false;
        if(btn && prevText) this.utils.loading4button(btn, 'done', prevText);
      },
      error: error => {
        this.utils.errorSnackBar(`Unable to load users!`, `close`);
        console.log(error);
      }
    }
    this.userservice.getAllUsers(
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


 ngOnDestroy(): void {
     if(this.destroySub) this.destroySub.unsubscribe();
 } 

}
