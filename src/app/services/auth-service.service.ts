import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogInResponse, userLoginDetails } from '../models/authModel';
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
}
