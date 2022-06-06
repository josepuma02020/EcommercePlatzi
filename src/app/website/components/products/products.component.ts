import { Component, Input, Output, EventEmitter } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../../models/product.model';

import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  total = 0;
  @Input() set productId(id: string | null) {
    if (id) {
      this.OnshowDetail(id);
    }
  }
  @Input() products: Product[] = [];
  @Output() onloadmore: EventEmitter<string> = new EventEmitter<string>();
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: ''
    },
    description: ''
  };
  limit = 10;
  offset = 0;

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }
  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
  toogleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }
  OnshowDetail(id: string) {
    this.statusDetail = 'loading';
    if (!this.showProductDetail) {
      this.showProductDetail = true;
      console.log(this.showProductDetail);
    }
    this.productsService.getProduct(id)
      .subscribe(data => {

        this.productChosen = data;
        this.statusDetail = 'success';
      }, errorMsg => {
        window.alert(errorMsg);
        this.statusDetail = 'error';
      });
  }
  readAndUpdate(id: string) {
    this.productsService.getProduct(id)
      .pipe(
        switchMap((product) => this.productsService.update(product.id, { title: 'cheangennnn' })),
      )
      .subscribe(data => {
        console.log(data);
      })
  }
  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo product',
      description: 'aslidha',
      images: [''],
      price: 1000,
      categoryId: 2,
    }
    this.productsService.create(product)
      .subscribe(data => {
        this.products.unshift(data);
      })
  }
  UpdateProduct() {
    const changes: UpdateProductDTO = {
      title: 'nuevo titulo',
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
      .subscribe(data => {
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
        this.products[productIndex] = data;
      });
  }
  DeleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id)
      .subscribe(() => {
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
        this.products.splice(productIndex, 1);
        this.showProductDetail = false;
      })
  }
  LoadMore() {
    this.onloadmore.emit();

  }
}
