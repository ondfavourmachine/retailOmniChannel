import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ACustomerTransactionLimit } from 'src/app/models/generalModels';

@Component({
  selector: 'app-update-acustomers-limit',
  templateUrl: './update-acustomers-limit.component.html',
  styleUrls: ['./update-acustomers-limit.component.scss']
})
export class UpdateACustomersLimitComponent implements OnInit {
  pinLimit: any;
  tokenLimit: any;
  username: any;
  reason: any;
  transactionType: any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {customer: ACustomerTransactionLimit},
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.pinLimit = this.data.customer.daily_limit;
    this.tokenLimit = this.data.customer.token;
    this.username = this.data.customer.username;
    this.transactionType = this.data.customer.transactiontype
  }


  updateLimit(event: Event){
  
  }

}
