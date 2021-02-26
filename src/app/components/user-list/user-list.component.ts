import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  Users: any;
  CurrentUser = null;
  CurrentIndex = -1;
  id = 0;
  name = '';
  login = '';
  pass = '';
  active = false;
  master = false;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.retrieveUsers();
  }

  retrieveUsers() {
    this.usersService.getAll()
      .subscribe(
        data => {
          this.Users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveUsers();
    this.CurrentUser = null;
    this.CurrentIndex = -1;
  }

  setActiveUser(User, Index) {
    this.CurrentUser = User;
    this.CurrentIndex = Index;
  }

  searchLogin() {
    this.usersService.findByLogin(this.login)
      .subscribe(
        data => {
          this.Users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
