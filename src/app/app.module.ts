import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatListModule} from "@angular/material/list";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { JwtModule } from '@auth0/angular-jwt';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { httpInterceptorProviders } from './interceptors/http-request-interceptor';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './common_pages/dashboard/dashboard.component';
import { SpinnerComponent } from './elements/spinner/spinner.component';
import { ToolSideComponent } from './components/internal_layout/tool-side/tool-side.component';
import { InternalLayoutComponent } from './components/internal_layout/internal-layout/internal-layout.component';
import { EditPasswordUserDialogComponent } from './dialogs/edit-password-user-dialog/edit-password-user-dialog.component';
import { PrecompiledUserDialogComponent } from './dialogs/precompiled-user-dialog/precompiled-user-dialog.component';
import { EditCurrentUserDialogComponent } from './dialogs/edit-current-user-dialog/edit-current-user-dialog.component';
import { DeleteUserDialogComponent } from './dialogs/delete-user-dialog/delete-user-dialog.component';
import { AddUserDialogComponent } from './dialogs/add-user-dialog/add-user-dialog.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { ReplacePipe } from './pipes/replace.pipe';
import { CruscottoComponent } from './common_pages/cruscotto/cruscotto.component';

export function tokenGetter() {
  return localStorage.getItem('cook');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SpinnerComponent,
    ToolSideComponent,
    InternalLayoutComponent,
    PrecompiledUserDialogComponent,
    EditPasswordUserDialogComponent,
    UserCreateComponent,
    EditCurrentUserDialogComponent,
    DeleteUserDialogComponent,
    AddUserDialogComponent,
    ReplacePipe,
    CruscottoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatStepperModule,
    MatListModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxDatatableModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  exports: [
    ToolSideComponent,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    NgxDatatableModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}, httpInterceptorProviders, CookieService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
