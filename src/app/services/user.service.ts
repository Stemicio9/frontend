import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {httpOptions} from "./auth.service";
import {UserDto} from "../entities/user-dto";
import {Observable} from "rxjs";


const USER_API = environment.baseurl + 'api/user/';
const AUTH_API = environment.baseurl + 'auth/';
const CSV_API = environment.baseurl + 'api/csv/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  listUsers(){
    return this.http.get(USER_API + 'list');
  }

  saveUser(user: any){
    user.controllo = 'CONTROLLO';
    return this.http.post(USER_API + 'signup', user, {responseType: 'text'});
  }

  updateUser(user: any){
    return this.http.post(USER_API + 'updateuser', user, {responseType: 'text'});
  }


  removeuser(user: any) {
    return this.http.post(USER_API + 'removeuser', user);
  }

  updatepassword(user: UserDto){
    return this.http.post(USER_API + 'updatepassword',user);
  }
  chechemail(email: string){
    return this.http.get(USER_API + 'checkemail', {params: {
        email: email}});
  }

  existUser(username:string) {
    return  this.http.get(USER_API + 'existsuser', {params: {
        username: username}});
  }

  changeMailRequest(email: string){
    return this.http.post(USER_API + 'changemailrequest',{newmail: email});
  }

  verifyCode(email: string, code: string){
    return this.http.post(USER_API + 'verifycode',{newmail: email, code: code});
  }

  updateemail(user: UserDto){
    return this.http.post(USER_API + 'updateemail',user);
  }
}
