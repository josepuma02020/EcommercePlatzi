import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { UsersService } from '../../services/users.service'
import { StoreService } from '../../services/store.service'
import { User } from '../../models/user.model'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  token = '';
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private AuthService: AuthService,
    private UserService: UsersService,
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
  login() {
    this.AuthService.login('sebas@mail.com', '1212')
      .subscribe(rta => {
        this.token = rta.access_token;
        console.log(this.token);
        this.getProfile();
      })
  }
  getProfile() {
    this.AuthService.profile(this.token)
      .subscribe(user => {
        console.log(user);
        this.profile = user;
      })
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
}
