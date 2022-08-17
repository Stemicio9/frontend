import {Component, OnInit, ViewChild} from '@angular/core';
import {Page} from "../../entities/page";
import {MatSnackBar} from "@angular/material/snack-bar";
import { ScontrinoService } from 'src/app/services/scontrino.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  rows : any[] = [];

  showSpinner = false;

  scontrinomediodelgiorno = 0;
  numerovenditedelgiorno= 0;
  incassodelgiorno= 0;
  incassodellasettimana : any;



  constructor(public dialog: MatDialog,
              public scontrinoService: ScontrinoService,
              public snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.scontrinoService.listByDate(new Date('2022-07-18')).subscribe( (result: any) => {
      this.showSpinner = false;
      this.rows = result;
    },onerror => {this.showSpinner = false; this.opensnack("Errore durante la connessione al server")});

    let dateSend = new Date('2022-07-18');
    this.scontrinoService.scontrinomediodelgiorno(dateSend).subscribe(result => {
      console.log("risultato = ");
      console.log(result);
      this.scontrinomediodelgiorno = result.value;
    });
    this.scontrinoService.numerovenditedelgiorno(dateSend).subscribe(result => {
      console.log("risultato = ");
      console.log(result);
      this.numerovenditedelgiorno = result.value;
    });
    this.scontrinoService.incassodelgiorno(dateSend).subscribe(result => {
      console.log("risultato = ");
      console.log(result);
      this.incassodelgiorno = result.value;
    });
  }

/*   removeUser(utente: any){

    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.showSpinner = true;
          let username = utente.username;
          this.userService.removeuser(username).subscribe((result: any) => {
            this.modifyList(result);
            this.showSpinner = false;
            this.opensnack("Utente rimosso");
          },onerror => {this.showSpinner = false; this.opensnack("Errore durante la connessione al server")});
        }
    });

  } */

/*   currentUser(utente:any){

    const dialogRef = this.dialog.open(PrecompiledUserDialogComponent, {
      width: '60%',
      height: '80%',
      data: utente,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {

      this.showSpinner = true;
      if(result === undefined) {
        this.showSpinner = false;
        return;
      }
      let row: any = {

      };


      if(result!.username !== undefined){
         row['username'] = result.username;
      }
      if(result!.email !== undefined){
        row['email'] = result.email;
      }
      if(result!.role !== undefined){
        row['role'] = result.role;
      }

      row['deposits'] =  result.deposits;

      this.userService.updateUser(row).subscribe(result => {
        this.showSpinner = false;
        this.opensnack("Utente modificato");
        this.userService.listUsers().subscribe(
          (result: any) => {
            this.modifyList(result);
          },onerror => {this.showSpinner = false; this.opensnack("Errore durante la connessione al server")}

        )
      },onerror => {this.showSpinner = false; this.opensnack("Errore durante la connessione al server")});

    });
  } */

/*   editpassword(utente:any){

    const dialogRef = this.dialog.open(EditPasswordUserDialogComponent, {
      width: '45%',
      height: '50%',
      data: utente,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {


      this.showSpinner = true;
      if(result === undefined) {
        this.showSpinner = false;
        return;
      }

      let row: any = {
        username: result.username
      };


      if(result!.password !== undefined) {
        row['password'] = result.password;
      }
      this.userService.updatepassword(row).subscribe((result:any) => {
        this.showSpinner = false;
        if(result.uploadok){
          this.opensnack('Password modificata con successo');
        }else{
          this.opensnack('Errore nella modifica della password');
        }
        this.userService.listUsers().subscribe(
          (result: any) => {
            this.modifyList(result);
          },onerror => {this.showSpinner = false; this.opensnack("Errore durante la connessione al server")}
        )
      },onerror => {this.showSpinner = false; this.opensnack("Errore durante la connessione al server")});

    });
  }


  editemail(){
    const dialogRef = this.dialog.open(EditCurrentUserDialogComponent, {
      width: '55%',
      height: '55%',
      data: this.storageService.getUser().body,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {

      this.showSpinner = true;

      if(result === undefined) {
        this.showSpinner = false;
        return;
      }

      let row: any = {
        username: result.username
      };

      if(result!.email !== undefined){
        row['email'] = result.email;
      }
      this.userService.updateemail(row).subscribe(result => {
        this.showSpinner = false;

        this.opensnack("Email aggiornata");
        this.userService.listUsers().subscribe(
          (result: any) => {
            this.modifyList(result);
          },onerror => {this.showSpinner = false; this.opensnack("Errore durante la connessione al server")}
        )
      },onerror => {this.showSpinner = false; this.opensnack("Errore durante la connessione al server")});

    });
  } */

/*   editpasswordcurrentuser(){
    const dialogRef = this.dialog.open(EditPasswordUserDialogComponent, {
      width: '45%',
      height: '50%',
      data: this.storageService.getUser().body,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {

      this.showSpinner = true;
      if(result === undefined) {
        this.showSpinner = false;
        return;
      }
      let row: any = {
         username: result.username
      };


      if(result!.password !== undefined) {
        row['password'] = result.password;
      }
      this.userService.updatepassword(row).subscribe((result: any) => {
        this.showSpinner = false;
        if(result.uploadok){
          this.opensnack('Password modificata con successo');
        }else{
          this.opensnack('Errore nella modifica della password');
        }

        this.userService.listUsers().subscribe(
          (result: any) => {
            this.modifyList(result);
          },onerror => {this.showSpinner = false; this.opensnack("Errore durante la connessione al server")}
        )
      },onerror => {this.showSpinner = false; this.opensnack("Errore durante la connessione al server")});

    });
  }
 */

  opensnack(stringa:string){
    this.snackbar.open(stringa,'', {horizontalPosition : 'end',verticalPosition : 'top',duration: 5000});
  }
}
