import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/models/user';

//const baseUrl = 'http://localhost:8100/api/users';
const baseUrl = 'http://localhost:8080/api/users';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private CurrentUserSubject: BehaviorSubject<User>;
    public CurrentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.CurrentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('CurrentUser')));
        this.CurrentUser = this.CurrentUserSubject.asObservable();
    }

    public get CurrentUserValue(): User {
        return this.CurrentUserSubject.value;
    }

    login(Login, Pass) {
        return this.http.get<User>(`${baseUrl}/auth/${Login}/${Pass}`)
            .pipe(map(User => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('CurrentUser', JSON.stringify(User));
                this.CurrentUserSubject.next(User);
                console.log(User);
                return User;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('CurrentUser');
        this.CurrentUserSubject.next(null);
    }
}
