import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PartialObserver } from 'rxjs';
import { ACustomer, InformationForRetailDateRange, SuccessfulGetAllUsers, User } from 'src/app/models/generalModels';
import { CustomerInformationComponent } from 'src/app/reusables/customer-information/customer-information.component';
import { UserService } from 'src/app/services/user.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
 
  allUsers: User[] = [];
  isLoading: boolean = true;
  constructor(
    private userservice: UserService,
    private dialog: MatDialog,
    public utils: UtilityFuncsService
  ) { }

  ngOnInit(): void {
    this.fetchAllUsers();
  }

 
  fetchAllUsers(){
    const pObs: PartialObserver<SuccessfulGetAllUsers> = {
      next : async (val) => {
        const {data, pageSize} = val;
        this.allUsers = data.map(elem => ({...elem, showActions: false}));
        const toggleGroupItem: HTMLDivElement = Array.from(document.querySelectorAll('.toggle_Group_item')).find(elem => elem.textContent?.trim() == 'all users') as HTMLDivElement;
        toggleGroupItem.classList.add('selected');
        this.utils.successSnackBar(`${pageSize} profiles selected successfully`, `close`);
        this.isLoading = false;
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


  

}
