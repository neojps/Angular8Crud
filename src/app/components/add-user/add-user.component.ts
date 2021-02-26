import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  User = {
    id: 0,
    name: '',
    login: '',
    pass: '',
    active: false,
    master: false
  };
  submitted = false;

  constructor(
    private usersService: UsersService,
    private router: Router) { }

  ngOnInit() {
  }

  saveUser() {
    const data = {
      id: 0,
      name: this.User.name,
      login: this.User.login,
      pass: this.User.pass,
      active: this.User.active,
      master: false
    };

    this.usersService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/users']);
        },
        error => {
          console.log(error);
        });
  }

  newUser() {
    this.User = {
      id: 0,
      name: '',
      login: '',
      pass: '',
      active: false,
      master: false
    };
  }

}
