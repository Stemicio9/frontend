import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay, filter } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';

export interface MenuElement {
  path: string;
  title: string;
  icon: string;
}

export const ADMIN_ROUTES: MenuElement[] = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    icon: 'home',
  },
  {
    path: '/admin/cruscotto',
    title: 'Cruscotto Incassi',
    icon: 'person'
  },
  {
    path: '/admin/utenti',
    title: 'Gestione Utenti',
    icon: 'person'
  }
];

export const CLIENTE_ROUTES: MenuElement[] = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    icon: 'home',
  },
  {
    path: '/admin/cruscotto',
    title: 'Cruscotto Incassi',
    icon: 'person'
  }
];

@UntilDestroy()
@Component({
  selector: 'app-tool-side',
  templateUrl: './tool-side.component.html',
  styleUrls: ['./tool-side.component.css'],
})
export class ToolSideComponent implements OnInit {
  menuItems: MenuElement[] = [];

  role: string;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  utenteloggato = this.storageService.getUser().body.username;

  skipEvent = false;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
    private observer: BreakpointObserver
  ) {
    const user = this.storageService.getUser();
    this.role = user.body.role;
    switch (this.role) {
      case 'ADMIN':
        this.menuItems = ADMIN_ROUTES;
        break;
      case 'CLIENTE':
        this.menuItems = CLIENTE_ROUTES;
        break;
    }
  }

  ngOnInit(): void {
    this.observer
      .observe(['(max-width: 600px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res: any) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        this.storageService.clean();
        this.router.navigate(['/login']);
      },
      error: (err) => {},
    });
  }

 /*  @HostListener('window:beforeunload', ['$event'])
  async beforeunl(event: any) {
    if (this.skipEvent) {
      this.skipEvent = false;
      return;
    }

    //  event.preventDefault();

    var logout = false;
    this.storageService.clean();
    await this.authService.logout().subscribe({
      next: (res) => {
        logout = true;
      },
      error: (err) => {
        logout = true;
      },
    });
    if (!logout) {
      return;
    }
  } */
}
