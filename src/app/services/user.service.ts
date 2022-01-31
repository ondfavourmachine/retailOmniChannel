import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LockAProfileRequestBody } from '../models/authModel';
import { AccountTypesInGlobus, FullCustomerDetails, SuccessfulGetAllUsers } from '../models/generalModels';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.general_url;
  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(pageInfo: {pageNumber: number, pageSize: number}): Observable<SuccessfulGetAllUsers>{
    const {pageNumber, pageSize} = pageInfo;
    const url = this.baseUrl + environment.users.getAllUsers + `?${Object.keys(pageInfo)[0]}=${pageNumber}&${Object.keys(pageInfo)[1]}=${pageSize}`;
    return this.http.get<SuccessfulGetAllUsers>(url);
  }

  getLockedUsers(pageInfo: {pageNumber: number, pageSize: number}): Observable<SuccessfulGetAllUsers>{
    const {pageNumber, pageSize} = pageInfo;
    const url = this.baseUrl + environment.users.lockedUsers + `?${Object.keys(pageInfo)[0]}=${pageNumber}&${Object.keys(pageInfo)[1]}=${pageSize}`;
    return this.http.get<SuccessfulGetAllUsers>(url);
  }

  activeUsers(pageInfo: {pageNumber: number, pageSize: number}): Observable<SuccessfulGetAllUsers>{
    const {pageNumber, pageSize} = pageInfo;
    const url = this.baseUrl + environment.users.activeUsers + `?${Object.keys(pageInfo)[0]}=${pageNumber}&${Object.keys(pageInfo)[1]}=${pageSize}`;
    return this.http.get<SuccessfulGetAllUsers>(url);
  }

  getNextPage(nextPage: string): Promise<SuccessfulGetAllUsers>{
    const url = this.baseUrl + environment.users.getAllUsers + '?' + nextPage.split('?')[1];
    return this.http.get<SuccessfulGetAllUsers>(url).toPromise();
  }

  getCustomerByAccountNumber(customerAcctNo: string): Promise<FullCustomerDetails>{
    const url = this.baseUrl + environment.users.getACustomerInformation + `?AccountNumber=${customerAcctNo}`;
    return this.http.get<FullCustomerDetails>(url).toPromise();
  }

  getTotalAccts(): Observable<AccountTypesInGlobus>{
    const url = `${this.baseUrl}${environment.users.getTotalAccs}`;
    return this.http.get<AccountTypesInGlobus>(url);
  }

  lockAProfiile(profile: Partial<LockAProfileRequestBody>): Observable<{
    success: boolean,
    response: number,
    responseMessage: string
  }>{
    const url = `${this.baseUrl}${environment.users.lockAProfile}`;
    return this.http.post<{success: boolean,response: number,responseMessage: string}>(url, profile);
  }

  unlockAProfile(profile : Partial<LockAProfileRequestBody>): Observable<{success: boolean,response: number,responseMessage: string}>{
    const url = `${this.baseUrl}${environment.users.unlockAProfile}`;
    return this.http.post<{success: boolean,response: number,responseMessage: string}>(url, profile);
  }

  searchUsersByDateTimeAndOtherAccDetails(dates: string[],pageInfo: {pageNumber: number, pageSize: number}): Observable<any>{
    	const url = `${this.baseUrl}${environment.users.searchUsersWithDates}`;
      const params = new HttpParams()
        .set('pageNumber', pageInfo.pageNumber)
        .set('pageSize', pageInfo.pageSize)
        .set('startDate', dates[0])
        .set('endDate', dates[1])
      return this.http.get(url, {params});
  }

  searchUserByAcc(accountNum: string): Observable<FullCustomerDetails>{
    const params = new HttpParams().set('AccountNumber', accountNum)
    const url = `${this.baseUrl}${environment.users.searchUserByAcctNumber}`;
    return this.http.get<FullCustomerDetails>(url, {params});
   
  }
}
