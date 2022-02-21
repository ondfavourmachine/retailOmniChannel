import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ACustomersUpdateLimit, ACustomerTransactionLimit, BankOperation, IntiateUpdateLimit, SuccessfulFetchingOfCustomersTransactionLimits, SuccessfulMobileUSSDRIBTransactions, SuccessfulNipTransactions } from '../models/generalModels';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  baseUrl: string = environment.general_url;
  constructor(
    private http: HttpClient
  ) { }

  getNipTransactions(pageInfo: {pageNumber: number,pageSize: number}): Observable<SuccessfulNipTransactions>{
    const params = new HttpParams()
    .set('pageNumber', pageInfo.pageNumber)
    .set('pageSize', pageInfo.pageSize)
    return this.http.get<SuccessfulNipTransactions>(`${this.baseUrl}${environment.transaction.nipTransactions}`, {params});
  }

  getMobileUSSDRIBTransactions(pageInfo: {pageNumber: number,pageSize: number, channel: BankOperation}): Observable<SuccessfulMobileUSSDRIBTransactions>{
    const params = new HttpParams()
    .set('pageNumber', pageInfo.pageNumber)
    .set('pageSize', pageInfo.pageSize)
    .set('channel', pageInfo.channel)
    return this.http.get<SuccessfulMobileUSSDRIBTransactions>(`${this.baseUrl}${environment.transaction.mobileUssdRibTransactions}`, {params});
  }

  getTransactionLimitForAllCustomers(pageInfo: {pageNumber: number,pageSize: number}): Observable<SuccessfulFetchingOfCustomersTransactionLimits>{
    const params = new HttpParams()
    .set('pageNumber', pageInfo.pageNumber)
    .set('pageSize', pageInfo.pageSize)
    return this.http.get<SuccessfulFetchingOfCustomersTransactionLimits>(`${this.baseUrl}${environment.transaction.getTransactionLimitsForAllCustomers}`, {params});
  }

  intiateUpdateLimit(req: IntiateUpdateLimit): Observable<{message: string, success: boolean}>{
    const url = `${this.baseUrl}${environment.users.initiateUpdateLimit}`;
    return this.http.post<{message: string, success: boolean}>(url, req);
  }

  searchForAUserToModifyLimit(username: string): Observable<Array<ACustomersUpdateLimit>>{
    const url = `${this.baseUrl}${environment.users.searchUserByUsername}`;
    const params = new HttpParams()
    .set('username', username)
    return this.http.get<Array<ACustomersUpdateLimit>>(url, {params});
  }

  searchNipTransByDateTimeAndOtherAccDetails(dates: string[],pageInfo: {pageNumber: number, pageSize: number}): Observable<any>{
    const url = `${this.baseUrl}${environment.transaction.getNipTransactionsByDateRange}`;
    const params = new HttpParams()
      .set('pageNumber', pageInfo.pageNumber)
      .set('pageSize', pageInfo.pageSize)
      .set('startDate', dates[0])
      .set('endDate', dates[1])
    return this.http.get(url, {params});
}
}
