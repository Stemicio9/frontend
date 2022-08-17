import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './user.service';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private userService: UserService,
    private jwtHelper: JwtHelperService
  ) {}

  clean(): void {
    localStorage.clear();
    // window.sessionStorage.clear();
  }

  public saveCookieDate() {

    localStorage.removeItem('cookiescad');

    var addedDate = this.addDays(new Date(), 365);
    var string = String(addedDate.toJSON());

    localStorage.setItem('cookiescad', string);
  }

  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    //   window.sessionStorage.removeItem(USER_KEY);
    //   window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    //   const user = window.sessionStorage.getItem(USER_KEY);
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  public isLoggedIn(): boolean {
    //    const user = window.sessionStorage.getItem(USER_KEY);

    const user = localStorage.getItem(USER_KEY);

    if (user) {
      if (this.checkCookieDate()) {
        return true;
      }
    }
    return false;
  }

  checkCookieDate(): boolean {
    var strdate = localStorage.getItem('cookiescad');
    let datecookie = new Date(strdate!);
    return this.differenceInDays(new Date(), datecookie) > 0;
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  addMinutes(date: Date, days: number): Date {
    date.setMinutes(date.getMinutes() + days);
    return date;
  }

  differenceInDays(date1: Date, date2: Date) {
    var Time = date2.getTime() - date1.getTime();
    var Days = Time / (1000 * 3600 * 24);

    return Days;
  }
}
