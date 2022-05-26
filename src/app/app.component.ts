import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'
import { UsersService } from './services/users.service'
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  constructor(
    private AuthService: AuthService,
    private UserService: UsersService,
  ) {

  }

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.UserService.create({
      name: 'sebas',
      email: 'sebas@mail.com',
      password: '1212'
    })
      .subscribe(rta => {
        console.log(rta);
      })
  }
  login() {
    this.AuthService.login('sebas@mail.com', '1212')
      .subscribe(rta => {
        console.log(rta.access_token);
      })
  }
}
