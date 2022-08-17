import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserDto} from "../../entities/user-dto";
import Validation from "../../utils/validation";

@Component({
  selector: 'app-edit-password-user-dialog',
  templateUrl: './edit-password-user-dialog.component.html',
  styleUrls: ['./edit-password-user-dialog.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class EditPasswordUserDialogComponent implements OnInit {



  formcredeziali = this._formBuilder.group({
    password: ['', Validators.required],
    conferma: ['', [Validators.required]],
  },
    {validators: [Validation.match('password' , 'conferma')]});

  confirm = '';
  showerror = false;

  constructor(public dialogRef: MatDialogRef<EditPasswordUserDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: UserDto,private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  noAdd(){
    this.dialogRef.close();

  }

  salvaUtente(){
    if(this.formcredeziali.invalid){
      this.showerror=true;
      return;
    }
    this.data.password = this.formcredeziali.controls['password'].value !== null ? this.formcredeziali.controls['password'].value : '';
    this.dialogRef.close(this.data);
  }
}
