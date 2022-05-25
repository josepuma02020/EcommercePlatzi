import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators';

import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model';
import { Thumbs } from 'swiper';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiurl = '/api/products';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(this.apiurl, { params })
      .pipe(
        retry(3)
      );
  }
  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiurl}/${id}`);
  }
  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiurl}`, {
      params: { limit, offset }
    });
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
