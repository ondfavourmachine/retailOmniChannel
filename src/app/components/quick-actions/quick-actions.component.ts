import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuickActionsLockUnLockModifyLimitComponent } from '../quick-actions-lock-un-lock-modify-limit/quick-actions-lock-un-lock-modify-limit.component';

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.scss']
})
export class QuickActionsComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  startLockUnLockModifyLimitProcess(typeOfAction: 'lock' | 'unlock' | 'modify limit'){
    switch(typeOfAction){
      case 'lock':
      case 'unlock':
        this.dialog.open(
          QuickActionsLockUnLockModifyLimitComponent,
          {
            width: '50vw',
            height: '50vh',
            maxHeight: '65vh',
            panelClass: 'quickActionsUnlockLockModifyLimit',
            data: {
              typeOfAction
            }
          }
          )
       break;
      case 'modify limit':
        this.dialog.open(
          QuickActionsLockUnLockModifyLimitComponent,
          {
            width: '60vw',
            height: '50vh',
            maxHeight: '65vh',
            panelClass: 'quickActionsUnlockLockModifyLimit',
            data: {
              typeOfAction
            }
          }
          )
      break;
    }
  }

}
