import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true,
  observe: 'response' as 'response'
};

const AUTH_API = environment.baseurl + 'auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password
      },
      httpOptions
    );
  }


  preLogin(username: string, password: string): Observable<any>{
    return this.http.post(
      AUTH_API + 'presignin',
      {
        username,
        password,
      },
      httpOptions
    );
  }



  register(username: string, role: string, password: string, email:string): Observable<any> {

    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        role,
        password,
        email
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, {responseType: 'text'});
  }




}
