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
  cart$:Observable<Cart | null>


  public selectedNumber: number = 0;
  public product: any;
  public filterCategory: any;
  searchkey: string = "";

  constructor(private store: Store<AppState>, private productService: ProductService, private cartService: CartService) {
    this.products$ = this.store.select(productsSelector)
    this.cart$ = this.store.select(cartSelector)
  
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  
    this.productService.getProducts().subscribe((res) => {
      this.product = res;
      this.filterCategory = res;
     
      this.product.forEach((product: any) => {
        if (product.category === "women's clothing" || "men's clothing") {
          product.category = 'fashion',product.category='book'
        }
        Object.assign(product, {quantity: 1, total: product.price });
      })
      console.log(this.product);
      
    })
    this.cartService.search.subscribe((val: any) => {
      this.searchkey = val;
    })
  }
  
  addtocart(product: Product) {
    this.store.dispatch(updateCart({ data: product }))
  }
  
  filter(category: string) {
    this.filterCategory = this.product
      .filter((product: any) => {
        if (product.category == category || category == '') {
          return product;
        }
      })
  }
  //  inc(item: any) {
  //   console.log(item.quantity);
    
  //   if (item.quantity != 5) {
  //     item.quantity += 1;
    
  //   }
    
  // }
  // dec(item: any) {
  //   if (item.quantity != 5) {
  //     item.quantity -= 1;
  //   }
  // }
  // inc(qty: number) {
  //   console.log("selected quantity",qty);
  //   console.log("quantity avaiable",this.product );
    
  //   if (qty != this.product.quantity) {
  //     qty += 1;
  //     console.log(qty);
  //   }
  //   return qty;
    
  // }
  // dec(qty: number) {
  //   console.log("selected quantity",qty);
  //   console.log("quantity avaiable",this.product.quantity );
  //   if (qty != this.product.quantity) {
  //     qty -= 1;
  //   }
  }
// }
