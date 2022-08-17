import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const SCONTRINO_API = environment.baseurl + 'auth/';

@Injectable({ providedIn: 'root' })
export class ScontrinoService {

  constructor(private http: HttpClient) {}


  listByDate(date: any): Observable<any> {
    return this.http.post(
      SCONTRINO_API + 'listbydate',
      {
        date
      }
    );
  }

  listForNegozio(date: any, negozio: string): Observable<any> {
    return this.http.post(
      SCONTRINO_API + 'listfornegozio',
      {
        date,
        negozio
      }
    );
  }


  scontrinomediodelgiorno(date: any): Observable<any> {
    return this.http.post(
      SCONTRINO_API + 'scontrinomediodelgiorno',
      {
        date
      }
    );
  }

  numerovenditedelgiorno(date: any): Observable<any> {
    return this.http.post(
      SCONTRINO_API + 'numerovenditedelgiorno',
      {
        date
      }
    );
  }

  incassodelgiorno(date: any): Observable<any> {
    return this.http.post(
      SCONTRINO_API + 'incassodelgiorno',
      {
        date
      }
    );
  }

  incassodellasettimana(date: any): Observable<any> {
    return this.http.post(
      SCONTRINO_API + 'incassodellasettimana',
      {
        date
      }
    );
  }

}
