import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ACustomerTransactionLimit, InformationForRetailDateRange } from 'src/app/models/generalModels';
import { UtilityFuncsService } from 'src/app/services/utility-funcs.service';
import { UpdateACustomersLimitComponent } from '../update-acustomers-limit/update-acustomers-limit.component';

@Component({
  selector: 'app-general-modify-limit',
  templateUrl: './general-modify-limit.component.html',
  styleUrls: ['./general-modify-limit.component.scss']
})
export class GeneralModifyLimitComponent implements OnInit {
 isLoading: boolean = true;
 customersForLimitModification: ACustomerTransactionLimit[] = [];
 info: InformationForRetailDateRange = {
  labelText: 'Select Period:',
  buttonText: 'Fetch',
  sortingIcon: false,
  extraButtonClasses: ['px-10']
}
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {customers: ACustomerTransactionLimit[]},
    public utils: UtilityFuncsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.customersForLimitModification = this.data.customers;
    if (this.customersForLimitModification.length > 0) this.isLoading = false;
  }

  updateACustomersLimit(customer: ACustomerTransactionLimit){
    this.dialog.closeAll()
    const dialog = this.dialog.open(UpdateACustomersLimitComponent, {
      width: '60vw',
      height: '70vh',
      panelClass: 'transactionLimitUpdate',
      data: {
        customer,
      }
    })
    dialog.afterClosed().subscribe(
      val => console.log(val),
      // err => console.log(err)
    )
  }

}
