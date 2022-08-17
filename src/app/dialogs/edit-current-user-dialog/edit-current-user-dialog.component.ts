import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {UserDto} from "../../entities/user-dto";
import {UserService} from "../../services/user.service";
import Validation from "../../utils/validation";


@Component({
  selector: 'app-edit-current-user-dialog',
  templateUrl: './edit-current-user-dialog.component.html',
  styleUrls: ['./edit-current-user-dialog.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class EditCurrentUserDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditCurrentUserDialogComponent>,
              private _formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: UserDto,
              private userservice: UserService) { }




  formcredeziali = this._formBuilder.group({
    email: [this.data.email,[Validators.required, Validators.email], Validation.emailExists(this.userservice)],
  });
  confirm = '';
  showerror = false;
  errorMessage = '';

  formCode: any = {
    code: null
  };
  codeVisual = false;
  wrongCode = false;
  emailSended = '';

  showSpinner = false;

  ngOnInit(): void {
}
  noAdd(){
    this.dialogRef.close();
  }



  passaCodice(){
    if(!this.formcredeziali.valid){
      return;
    }
    var s = <string> this.formcredeziali.controls.email.value;
    this.showSpinner = true;
    this.userservice.changeMailRequest(s).subscribe((data:any) => {
      this.codeVisual = true;
      this.emailSended = data.email;
      this.showSpinner = false;
    }, onerror => {this.showSpinner = false;});

  }

  salvaUtente(){
    var s = <string> this.formcredeziali.controls.email.value;
    this.userservice.verifyCode(s, this.formCode.code).subscribe(result => {
      //  this.data.email = s;
      this.data.email = s;
      this.dialogRef.close(this.data);
    }, onerror => {

      this.wrongCode = true;
      return;
    });


  }







}
