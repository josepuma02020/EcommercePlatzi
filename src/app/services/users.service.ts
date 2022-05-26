import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment';
import { User, CreateUserDTO } from './../models/user.model';
import { isThisQuarter } from 'date-fns';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiurl = `${environment.API_URL}/api/users`;
  constructor(
    private http: HttpClient
  ) {

  }

  create(dto: CreateUserDTO) {
    return this.http.post<User>(this.apiurl, dto);
  }
  getAll() {
    return this.http.get<User[]>(this.apiurl);
  }
}
