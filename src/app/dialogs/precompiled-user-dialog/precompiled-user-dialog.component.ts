import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserDto} from "../../entities/user-dto";
import {FormBuilder, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import Validation from "../../utils/validation";
import {UserService} from "../../services/user.service";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-precompiled-user-dialog',
  templateUrl: './precompiled-user-dialog.component.html',
  styleUrls: ['./precompiled-user-dialog.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class PrecompiledUserDialogComponent implements OnInit {

  formcredeziali = this._formBuilder.group({
    ruolo: ['', Validators.required],
    username: ['', Validators.required],
    email: ['',Validators.email, Validation.emailExistsAndCurrentUser(this.userservice, this.data.email)],
  });

  confirm = '';
  insertable = false;

  depositList: any[] = [];

  constructor(public dialogRef: MatDialogRef<PrecompiledUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserDto, private _formBuilder: FormBuilder,
              private userservice: UserService, private storageService: StorageService) { }

  noAdd(){
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }


  salvaUtente(){
    this.data.username = this.formcredeziali.controls.username.value !== null ? this.formcredeziali.controls.username.value : '';
    this.data.email = this.formcredeziali.controls.email.value !== null ? this.formcredeziali.controls.email.value : '';
    this.data.role = this.formcredeziali.controls.ruolo.value !== null ? this.formcredeziali.controls.ruolo.value : '';
    this.dialogRef.close(this.data);
  }


}
