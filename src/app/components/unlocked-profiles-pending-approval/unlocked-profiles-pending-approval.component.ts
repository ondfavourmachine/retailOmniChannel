import { Component, OnInit } from '@angular/core';
import { PartialObserver } from 'rxjs';
import { AccountStatus, SuccessfulGetProfilesAwaitingApproval, User } from 'src/app/models/generalModels';
import { UserService } from 'src/app/services/user.service';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';

@Component({
  selector: 'app-unlocked-profiles-pending-approval',
  templateUrl: './unlocked-profiles-pending-approval.component.html',
  styleUrls: ['./unlocked-profiles-pending-approval.component.scss']
})
export class UnlockedProfilesPendingApprovalComponent implements OnInit {
  unlockedProfilesAwaitingApproval: User[] = [];
  isLoading: boolean = true;
  constructor(
    private userservice: UserService,
    private utils: UtilityFuncsService
  ) { }

  ngOnInit(): void {
    this.fetchUnlockedProfilesAwaitingApproval();
  }


  refreshing(event: Event){

  }

  showSummary(unlockedProfile: any){
    this.utils.showCustomerInfoModal(unlockedProfile, undefined, true);
  }

  fetchUnlockedProfilesAwaitingApproval(){
    const pObs: PartialObserver<SuccessfulGetProfilesAwaitingApproval> = {
      next: val => {
        const {data} = val;
        this.unlockedProfilesAwaitingApproval = data;
        this.isLoading = false;
        this.utils.successSnackBar('Fetched profiles awaiting approval', 'close');
        
      },
      error: (err) => {
        this.isLoading = false;
        this.unlockedProfilesAwaitingApproval = [];
        this.utils.errorSnackBar('Unable to fetch profiles awaiting approval', 'close');
      },
    }
    this.userservice.getUnlockProfilesForApproval({pageNumber: 1, pageSize: 10})
    .subscribe(pObs)
  }

  checkStatus(status: AccountStatus){
    return status == 'PENDING APPROVAL';
  }
}
