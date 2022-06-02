import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service'
import { Product } from '../../models/product.model';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];
  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id');
      console.log(this.categoryId);
      if (this.categoryId) {
        this.ProductService.getByCategory(this.categoryId, this.limit, this.offset)
          .subscribe(data => {
            this.products = data;
          })
      }
    })
  }

}
