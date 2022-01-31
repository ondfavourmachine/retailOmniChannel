import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { RetailomniInputComponent } from 'src/app/reusables/retailomni-input/retailomni-input.component';
import { RetailomniDateRangeComponent } from '../../reusables/retailomni-date-range/retailomni-date-range.component';
import { CustomerInformationComponent } from '../../reusables/customer-information/customer-information.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InitiateLockOrUnLockComponent } from '../../components/initiate-lock-or-un-lock/initiate-lock-or-un-lock.component';
import { GeneralTransactionsComponent } from '../../components/general-transactions/general-transactions.component';
import { NgxSkeletonModule } from 'ngx-skeleton';
import { SuccessfulUpdateComponent } from '../../components/successful-update/successful-update.component';
import { DisplaySearchResultsComponent } from '../../reusables/display-search-results/display-search-results.component';
import { TransactionsSummaryComponent } from '../../components/transactions-summary/transactions-summary.component';
import { QuickActionsLockUnLockModifyLimitComponent } from '../../components/quick-actions-lock-un-lock-modify-limit/quick-actions-lock-un-lock-modify-limit.component';
import { GeneralModifyLimitComponent } from '../../components/general-modify-limit/general-modify-limit.component';
import { UpdateACustomersLimitComponent } from '../../components/update-acustomers-limit/update-acustomers-limit.component';



@NgModule({
  declarations: [
    NavBarComponent,
    SideBarComponent,
    RetailomniInputComponent,
    RetailomniDateRangeComponent,
    CustomerInformationComponent,
    InitiateLockOrUnLockComponent,
    GeneralTransactionsComponent,
    SuccessfulUpdateComponent,
    DisplaySearchResultsComponent,
    TransactionsSummaryComponent,
    QuickActionsLockUnLockModifyLimitComponent,
    GeneralModifyLimitComponent,
    UpdateACustomersLimitComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDatepickerModule,
    NgxSkeletonModule
  ],
  exports: [
    NavBarComponent,
    SideBarComponent,
    RetailomniInputComponent,
    CustomerInformationComponent,
    RetailomniDateRangeComponent,
    DisplaySearchResultsComponent,
    TransactionsSummaryComponent,
    GeneralModifyLimitComponent,
    UpdateACustomersLimitComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatDialogModule,
    NgxSkeletonModule   
  ],
})
export class SharedModule { }
