import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PartialObserver } from 'rxjs';
import { SuccessfulGetAllUsers, User } from 'src/app/models/generalModels';
import { UserService } from 'src/app/services/user.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';
import { InitiateLockOrUnLockComponent } from '../initiate-lock-or-un-lock/initiate-lock-or-un-lock.component';

@Component({
  selector: 'app-locked-users',
  templateUrl: './locked-users.component.html',
  styleUrls: ['./locked-users.component.scss']
})
export class LockedUsersComponent implements OnInit {
  isLoading: boolean=  false;
  lockedUsers: User[] = [];
  constructor(
    private userservice: UserService,
    public utils: UtilityFuncsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchAllLockedUsers()
  }


  fetchAllLockedUsers(){
    document.querySelectorAll('.toggle_Group_item').forEach(elem => elem.classList.remove('selected'));
    const pObs: PartialObserver<SuccessfulGetAllUsers> = {
      next : async (val) => {
        // console.log(val);
        const {data, pageSize} = val;
        this.lockedUsers = data.map(elem => ({...elem, showActions: false}));
        (document.getElementById('lockedProfiles') as HTMLElement).classList.add('selected');
        this.utils.successSnackBar(`${pageSize} profiles selected successfully`, `close`);
        this.isLoading = false;
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
      val => console.log(val),
      err => console.log(err)
    )
  }

}
