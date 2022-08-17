import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDto } from '../../entities/user-dto';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import Validation from '../../utils/validation';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class AddUserDialogComponent implements OnInit {
  formcredeziali = this._formBuilder.group(
    {
      ruolo: ['', Validators.required],
      username: [
        '',
        [Validators.required],
        Validation.userExists(this.userservice),
      ],
      email: ['', [Validators.email], Validation.emailExists(this.userservice)],
      password: ['', [Validators.required, Validators.minLength(4)]],
      conferma: ['', [Validators.required]],
    },
    { validators: [Validation.match('password', 'conferma')] }
  );

  formdepositi = this._formBuilder.group({
    atleastone: ['', Validators.required],
  });

  confirm = '';

  depositList: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDto,
    private _formBuilder: FormBuilder,
    private userservice: UserService
  ) {}

  noAdd() {
    this.dialogRef.close();
  }

  ngOnInit(): void {}

  salvaUtente() {
    this.data.password = this.formcredeziali.controls.password.value !== null ? this.formcredeziali.controls.password.value : '';
    this.data.role = this.formcredeziali.controls.ruolo.value !== null ? this.formcredeziali.controls.ruolo.value : '';
    this.dialogRef.close(this.data);
  }
}
