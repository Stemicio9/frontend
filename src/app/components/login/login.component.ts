import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };

  errorMessage = '';
  isLoginFailed = false;

  constructor(
    public router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe(
      (data) => {
        this.storageService.saveCookieDate();
        this.storageService.saveUser(data);
        this.router.navigate(['/admin/dashboard']);
      },
      (err) => {
        this.isLoginFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }
}
