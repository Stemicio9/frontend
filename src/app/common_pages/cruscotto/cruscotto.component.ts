import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ScontrinoService} from "../../services/scontrino.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cruscotto',
  templateUrl: './cruscotto.component.html',
  styleUrls: ['./cruscotto.component.scss']
})
export class CruscottoComponent implements OnInit {

  rows : any[] = [];

  showSpinner = false;

  scontrinomediodelgiorno = 0;
  numerovenditedelgiorno= 0;
  incassodelgiorno= 0;
  incassodellasettimana : any;

  dateSend = new Date('2022-07-18');

  constructor(public dialog: MatDialog,
              public scontrinoService: ScontrinoService,
              public snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.scontrinoService.listByDate(this.dateSend).subscribe((result: any) => {
      this.showSpinner = false;
      this.rows = result;
    }, onerror => {
      this.showSpinner = false;
      this.opensnack("Errore durante la connessione al server")
    });

  }

  opensnack(stringa:string){
    this.snackbar.open(stringa,'', {horizontalPosition : 'end',verticalPosition : 'top',duration: 5000});
  }
}
