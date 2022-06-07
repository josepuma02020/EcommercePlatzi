import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

import { AuthService } from './../../../services/auth.service'
import { UsersService } from './../../../services/users.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User | null = null;

  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.authService.myUser$
      .subscribe(data => {
        this.user = data;
      })
  }

}
