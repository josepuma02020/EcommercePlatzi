import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'
import { UsersService } from './services/users.service'
import { FilesService } from './services/files.service'
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';
  constructor(
    private AuthService: AuthService,
    private UserService: UsersService,
    private fileService: FilesService,
  ) {

  }

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }
  downloadPDF() {
    this.fileService.getFile('my.pdf', 'Https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'aplication/pdf')
      .subscribe()
  }


}
