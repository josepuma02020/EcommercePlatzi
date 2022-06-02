import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model';
import { environment } from 'src/environments/environment';
import { checkTime } from '../interceptors/time.interceptor'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiurl = `${environment.API_URL}/api`;

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    checkTime();
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(`${this.apiurl}/products`, { params, context: checkTime() })
      .pipe(
        retry(3),
        map(products => products.map(item => {
          return {
            ...item,
            taxes: .19 * item.price
          }
        }))
      );
  }
  getByCategory(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(`${this.apiurl}/categories/${categoryId}/products`,
      { params }
    );
  }
  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiurl}/${id}`)
      .pipe(
        catchError((error, HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Conflict) {
            return throwError('UAlgo esta fallando el servidor.');
          }
          if (error.status === HttpStatusCode.NotFound) {
            return throwError('Producto no existe.');
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError('No estas permitido.');
          }
          return throwError('Ups algo salio mal.')
        })
      )
  }
  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiurl}/products`, {
      params: { limit, offset }, context: checkTime()
    })
      .pipe(
        retry(3),
        map(products => products.map(item => {
          return {
            ...item,
            taxes: .19 * item.price
          }
        }))
      );
  }
  create(dto: CreateProductDTO) {
    return this.http.post<Product>(`${this.apiurl}/products`, dto);
  }
  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiurl}/products/${id}`, dto);
  }
  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiurl}/products/${id}`);
  }
}
