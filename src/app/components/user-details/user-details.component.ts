import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  CurrentUser = null;
  Message = '';

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.Message = '';
    this.getUser(this.route.snapshot.paramMap.get('id'));
  }

  getUser(Id) {
    this.usersService.get(Id)
      .subscribe(
        data => {
          this.CurrentUser = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  activateUser() {
    this.CurrentUser.active = true;
    this.usersService.update(this.CurrentUser.id, this.CurrentUser)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  deactivateUser() {
    this.CurrentUser.active = false;
    this.usersService.update(this.CurrentUser.id, this.CurrentUser)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateUser() {
    this.usersService.update(this.CurrentUser.id, this.CurrentUser)
      .subscribe(
        response => {
          console.log(response);
          this.Message = 'The user was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteUser() {
    this.usersService.delete(this.CurrentUser.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/users']);
        },
        error => {
          console.log(error);
        });
  }

}
