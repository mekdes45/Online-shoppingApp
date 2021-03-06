import {
  deleteCart,
  loadcart,
  removeFromCart,
  updateCart,
} from './../../store/actions/cart/cart.actions';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../../../../../shared/models/cart.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { cartSelector } from 'src/app/store/selectors/cart/cart.selectors';
import { Product } from '../../../../../shared/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart$: Observable<Cart | null>;

  constructor(
    private cartService: CartService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.cart$ = this.store.select(cartSelector);
  }

  ngOnInit(): void {
    this.store.dispatch(loadcart());
  }
  deleteProductfromCart(product: Product) {
    this.store.dispatch(deleteCart({ data: product }));
  }
  emptycart() {
    this.cartService.removeAllCart();
  }

  dec(product: Product) {
    this.store.dispatch(removeFromCart({ data: product }));
  }
  inc(product: Product) {
    this.store.dispatch(updateCart({ data: product }));
  }
  checkout() {
    this.router.navigate(['/checkout']);
  }
 
}
