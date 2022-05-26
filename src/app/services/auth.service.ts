import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model'
import { User } from '../models/user.model'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiurl = `${environment.API_URL}/api/auth`;
  constructor(
    private http: HttpClient
  ) { }
  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiurl}/login`, { email, password });
  }
  profile(token: string) {
    // const headers = new HttpHeaders();
    // headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiurl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        //encaso de que quiera enviar mas headers
        // 'Content.type' : 'aplication/json'
      }
    });
  }
}
