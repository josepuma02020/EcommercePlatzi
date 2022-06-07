import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'
import { UsersService } from './services/users.service'
import { FilesService } from './services/files.service'
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';
  imgRta = '';
  constructor(
    private AuthService: AuthService,
    private UserService: UsersService,
    private fileService: FilesService,
  ) {

  }

  createUser() {
    this.UserService.create({
      name: 'Jose',
      email: 'jose@mail',
      password: '1234',
      role: 'customer'
    })
      .subscribe(rta => {
        console.log(rta);
      })
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
  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.fileService.UploadFile(file)
        .subscribe(rta => {
          console.log(rta.location);
          this.imgRta = rta.location;
        })
    }

  }

}
