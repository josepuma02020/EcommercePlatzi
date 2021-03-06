import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service'
import { CategoriesService } from '../../../services/categories.service'
import { UsersService } from '../../../services/users.service'
import { StoreService } from '../../../services/store.service'
import { User } from '../../../models/user.model'
import { Category } from '../../../models/category.model'
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];
  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private UserService: UsersService,
    private categoriesService: CategoriesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.authService.myUser$
      .subscribe(data => {
        this.profile = data;
      })
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  getAllCategories() {
    this.categoriesService.getAll()
      .subscribe(data => {
        this.categories = data;
      })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
  login() {
    // this.AuthService.login('sebas@mail.com', '1212')
    //   .subscribe(rta => {
    //     this.token = rta.access_token;
    //     console.log(this.token);
    //     this.getProfile();
    //   })
    // this.authService.loginAndGet('admin@mail.com', 'admin123')
    this.authService.loginAndGet('john@mail.com', 'changeme')
      .subscribe(user => {
        this.router.navigate(['/profile'])
      })
  }
  logout() {
    this.authService.logOut();
    this.profile = null;
    this.router.navigate(['/home']);
  }

}
