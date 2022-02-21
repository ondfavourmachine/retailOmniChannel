import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogInResponse, TokenGeneratedResponse, userLoginDetails } from '../models/authModel';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  baseUrl: string = environment.general_url;
  authUrl: string = environment.auth_login;
  constructor(private http: HttpClient) { }

  loginUser(user: userLoginDetails): Observable<LogInResponse>{
    return this.http.post<LogInResponse>(`${this.baseUrl}${this.authUrl}`, user)
    .pipe(
      map(
        val => {
          if(val.sessionId == null){
           throw new Error(`${user.Username}`);
          }
          else{
            return val;
          }
        }
      )
    )
  }

  fetchTokenForStaffToLogin(staffId: string, password:string): Observable<TokenGeneratedResponse>{
    const url = `${this.baseUrl}AuthBackend/GenerateToken`;
    const body = {
      Channel: 1,
      Username: staffId,
      Password: password,
      Device: '',
      GPS: '',
      AppVersion: ''
    }
    return this.http.post<TokenGeneratedResponse>(url, body);
  }

  switchRoles(role: string){
    const url = `${this.baseUrl}AuthBackend/SwitchRole`;
    const params = new HttpParams().set('data', role);
    return this.http.get(url, {params});
  }

  logout(body: {username: string, sessionId: string}): Observable<any>{
    const url = `${this.baseUrl}AuthBackend/Logout`
    return this.http.post(url, body);
  }
}

