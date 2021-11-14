import { cartSelector } from './../../store/selectors/cart/cart.selectors';
import { updateCart, loadcart } from './../../store/actions/cart/cart.actions';

import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { productsSelector } from 'src/app/store/selectors/product/product.selectors';
import { Observable } from 'rxjs';
import { Product } from '../../../../../shared/models/product.model';
import { loadProducts } from 'src/app/store/actions/product/product.actions';
import { Cart } from '../../../../../shared/models/cart.model';

@Component({
  selector: 'app-prducts',
  templateUrl: './prducts.component.html',
  styleUrls: ['./prducts.component.scss']
})
export class PrductsComponent implements OnInit {
  products$: Observable<Product[] | any>

  // cart$:Observable<Cart |null >
  public productList: any;
  searchkey: string = "";

  constructor(private store: Store<AppState>,private productService: ProductService,private cartService:CartService) {
    this.products$ = this.store.select(productsSelector)
    // this.cart$= this.store.select(cartSelector)
    
   }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    // this.store.dispatch(loadcart());
   
    
    this.productService.getProducts().subscribe((res) => {
      this.productList = res;
     
      this.productList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      })
    })
    this.cartService.search.subscribe((val:any) => {
      this.searchkey = val;
    })
  }
  // addtocarts(product:Product) {
  //  return this.cartService.addToCarts(product)
  // }
  addtocart(product: Product) {
  this.store.dispatch(updateCart({data:product}))
}
}
