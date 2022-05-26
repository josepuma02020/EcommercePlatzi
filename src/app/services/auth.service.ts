import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { switchMap, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model'
import { User } from '../models/user.model'
import { TokenService } from '../services/token.service'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiurl = `${environment.API_URL}/api/auth`;
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }
  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiurl}/login`, { email, password })
      .pipe(
        tap(response => this.tokenService.saveToken(response.access_token))
      );
  }
  getprofile() {
    // const headers = new HttpHeaders();
    // headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiurl}/profile`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      //   //encaso de que quiera enviar mas headers
      //   // 'Content.type' : 'aplication/json'
      // }
    });
  }
  loginAndGet(email: string, password: string) {
    return this.login(email, password)
      .pipe(
        switchMap(() => this.getprofile()),
      )
  }
}
