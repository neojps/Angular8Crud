import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/models/user';

//const baseUrl = 'http://localhost:8100/api/users';
const baseUrl = 'http://localhost:8080/api/users';

@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(`${baseUrl}/id/${id}`);
  }

  create(data) {
    return this.http.post<any>(baseUrl, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  
  findByLogin(login) {
    return this.http.get(`${baseUrl}/login/${login}`);
  }
}
