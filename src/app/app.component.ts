import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular8crud';

  CurrentUser: User;

  constructor(
    private router: Router,
    private AuthenticationService: AuthenticationService
  ) {
    this.AuthenticationService.CurrentUser.subscribe(x => this.CurrentUser = x);
  }

  logout() {
    this.AuthenticationService.logout();
    this.router.navigate(['/login']);
  }
}
