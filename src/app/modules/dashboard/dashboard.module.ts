import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from 'src/app/components/home/home.component';
import { UsersComponent } from 'src/app/components/users/users.component';
import { QuickActionsComponent } from '../../components/quick-actions/quick-actions.component';
import { UserHomeComponent } from '../../components/user-home/user-home.component';
import { LockedUsersComponent } from '../../components/locked-users/locked-users.component';
import { ActiveUsersComponent } from '../../components/active-users/active-users.component';
import { TransactionsComponent } from '../../components/transactions/transactions.component';
import { NiptransactionsComponent } from '../../components/niptransactions/niptransactions.component';
import { MobiletransactionsComponent } from '../../components/mobiletransactions/mobiletransactions.component';
import { RibtransactionsComponent } from '../../components/ribtransactions/ribtransactions.component';
import { UssdtransactionsComponent } from '../../components/ussdtransactions/ussdtransactions.component';
import { NqrtransactionsComponent } from '../../components/nqrtransactions/nqrtransactions.component';
import { BillstransactionsComponent } from '../../components/billstransactions/billstransactions.component';
import { AirtimetransactionsComponent } from '../../components/airtimetransactions/airtimetransactions.component';




const routes: Routes = [
  //  { path: '', redirectTo: 'dashboard',  pathMatch: 'full' },
  //  { path: '', }
   { 
    path: '', 
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'all',  pathMatch: 'full' },
      { path: 'all', component: DashboardComponent},
      { path: 'users', component: UserHomeComponent, children: [
         { path: '', redirectTo: 'all', pathMatch: 'full'},
         { path: 'all', component: UsersComponent},
         { path: 'lockedProfiles', component: LockedUsersComponent},
         { path: 'activeUsers', component: ActiveUsersComponent }
      ] },
      { path: 'transactions', component: TransactionsComponent, children: [
        { path: '', redirectTo: 'nip', pathMatch: 'full'},
        { path: 'nip', component: NiptransactionsComponent},
        { path: 'mobile', component: MobiletransactionsComponent},
        { path: 'ussd', component: UssdtransactionsComponent },
        { path: 'rib', component: RibtransactionsComponent},
        { path: 'nqr', component: NqrtransactionsComponent},
        { path: 'bills', component: BillstransactionsComponent},
        { path: 'airtime', component: AirtimetransactionsComponent }
     ] },
    ]
  
  
   },



]


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    UsersComponent,
    QuickActionsComponent,
    UserHomeComponent,
    LockedUsersComponent,
    ActiveUsersComponent,
    TransactionsComponent,
    NiptransactionsComponent,
    MobiletransactionsComponent,
    RibtransactionsComponent,
    UssdtransactionsComponent,
    NqrtransactionsComponent,
    BillstransactionsComponent,
    AirtimetransactionsComponent,
  
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class DashboardModule { }
