import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model';
import { Thumbs } from 'swiper';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiurl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.apiurl);
  }
  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiurl}/${id}`);
  }
  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiurl, dto);
  }
  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiurl}/${id}`, dto);
  }
  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiurl}/${id}`);
  }
}
