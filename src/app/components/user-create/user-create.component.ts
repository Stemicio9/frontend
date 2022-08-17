import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddUserDialogComponent} from "../../dialogs/add-user-dialog/add-user-dialog.component";
import {UserDto} from "../../entities/user-dto";
import {UserService} from "../../services/user.service";
import {PrecompiledUserDialogComponent} from "../../dialogs/precompiled-user-dialog/precompiled-user-dialog.component";
import {StorageService} from "../../services/storage.service";
import {DeleteUserDialogComponent} from "../../dialogs/delete-user-dialog/delete-user-dialog.component";
import {EditCurrentUserDialogComponent} from "../../dialogs/edit-current-user-dialog/edit-current-user-dialog.component";
import {EditPasswordUserDialogComponent} from "../../dialogs/edit-password-user-dialog/edit-password-user-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  rows : any[] = [];

  showSpinner = false;



  constructor(public dialog: MatDialog,
              private userService: UserService,
              public storageService : StorageService,
              public snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.userService.listUsers().subscribe(
      (result: any) => {
        this.modifyList(result);
        this.showSpinner = false;
      },onerror => {this.showSpinner = false; this.opensnack("Errore durante la connessione al server")}
    )
  }



  userCreate(){
    let user = new UserDto();
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '60%',
      height: '85%',
      data: user,
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

      row['password']= result.password;



      this.userService.saveUser(row).subscribe(result => {
        this.showSpinner = false;
        this.opensnack("Utente salvato");
        this.rows.push(row);
        // Riga necessaria per attivare il refresh di ngx table
        this.rows = [...this.rows]
      },onerror => {this.showSpinner = false; this.opensnack("Errore durante la connessione al server")});

    });
  }


  removeUser(utente: any){

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

  }

  currentUser(utente:any){

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
  }




  editpassword(utente:any){

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
  }





  modifyList(resultlist: any){
    var res = [];
    var username = this.storageService.getUser().body.username;
    for(let currentUser of resultlist){
      if(currentUser.username !== username){
        res.push(currentUser);
      }
    }
    this.rows = res;

  }


  editpasswordcurrentuser(){
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

  opensnack(stringa:string){
    this.snackbar.open(stringa,'', {horizontalPosition : 'end',verticalPosition : 'top',duration: 5000});
  }
}
