import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BankOperation, SuccessfulFetchingOfCustomersTransactionLimits, SuccessfulMobileUSSDRIBTransactions, SuccessfulNipTransactions } from '../models/generalModels';

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
}
