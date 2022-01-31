import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedInStaffRole } from 'src/app/models/authModel';
import { BankOperation, FullBillsTransactionsList, FullTransactionDetailsForUSSDMobileAndIbank, FullTransactionListForAirtime, SuccessfulAirtimeAndBills, SuccessfulChannelRecords, SuccessfulFetchingOfMobileTrans, SuccessfullFetchingOfDashboardSummaries } from 'src/app/models/generalModels';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl: string = environment.general_url;
  constructor(
    private http: HttpClient
  ) { }

  getMobileTransactions(): Observable<SuccessfulFetchingOfMobileTrans>{
    const params = new HttpParams().set('pageNumber',`1`).set('pageSize', '10');
    const url = `${this.baseUrl}${environment.dashboard.getMobileTransactions}`;
    return this.http.get<SuccessfulFetchingOfMobileTrans>(url, {params});
  }

  getDashboardTransactions(): Observable<SuccessfullFetchingOfDashboardSummaries>{
    const role: LoggedInStaffRole = JSON.parse(sessionStorage.getItem(`role`) as string);
    const url = `${this.baseUrl}${environment.dashboard.getTransactionSummary}`;
    const params = new HttpParams().set(`sessionid`, role.sessionId as string).set(`email`, role.email);
    return this.http.get<any>(url, {params});
  }

  getAirtimeAndBills(): Observable<SuccessfulAirtimeAndBills>{
    const url = `${this.baseUrl}${environment.dashboard.getAirtimeAndBills}`;
    return this.http.get<SuccessfulAirtimeAndBills>(url);
  }

  getChannelRecords(): Observable<SuccessfulChannelRecords>{
    const url = `${this.baseUrl}${environment.dashboard.getChannelRecords}`;
    const role: LoggedInStaffRole = JSON.parse(sessionStorage.getItem(`role`) as string);
    const params = new HttpParams().set(`sessionid`, role.sessionId as string).set(`email`, role.email);
    return this.http.get<SuccessfulChannelRecords>(url, {params});
  }

  getTransactions( extraInfo: {pageNumber: string, pageSize: string, channel: BankOperation})
  : Observable<FullTransactionDetailsForUSSDMobileAndIbank>
  {
    const params = new HttpParams().set(`channel`, extraInfo.channel as string).set(`pageNumber`, extraInfo.pageNumber).set(`pageSize`, extraInfo.pageSize);
    const url = `${this.baseUrl}${environment.dashboard.channelTransactions}`;
    return this.http.get<FullTransactionDetailsForUSSDMobileAndIbank>(url, {params});
  }


  getFullAirtimeTransactionsList(extraInfo: {pageNumber: string, pageSize: string}): Observable<FullTransactionListForAirtime>{
    const params = new HttpParams().set(`pageNumber`, extraInfo.pageNumber).set(`pageSize`, extraInfo.pageSize);
    const url = `${this.baseUrl}${environment.dashboard.fullAirtimeList}`
    return this.http.get<FullTransactionListForAirtime>(url, {params});
  }

  getFullBillsTransactionsList(extraInfo: {pageNumber: string, pageSize: string}): Observable<FullBillsTransactionsList>{
    const params = new HttpParams().set(`pageNumber`, extraInfo.pageNumber).set(`pageSize`, extraInfo.pageSize);
    const url = `${this.baseUrl}${environment.dashboard.billsTransactions}`;
    return this.http.get<FullBillsTransactionsList>(url, {params});
  }


}
