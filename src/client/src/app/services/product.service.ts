import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private api:ApiService) { }

  createProduct(product: Product) {
    return this.api.post<{ data: Product }>('create-product', product).pipe(map((res) => res.data));
  }

  getProducts() {
    return this.api.get <{ data: Product[] }>('products').pipe(map((res) => res.data));
  }
 
  }
 
  


