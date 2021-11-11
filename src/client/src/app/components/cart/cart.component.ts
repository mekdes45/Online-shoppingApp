import { loadcart } from './../../store/actions/cart/cart.actions';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../../../../../shared/models/cart.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { cartSelector } from 'src/app/store/selectors/cart/cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart$:Observable<Cart |null>
  public products: any = [];
  public grandTotal !: number;
  constructor(private cartService:CartService,private store:Store<AppState>) {
    this.cart$=this.store.select(cartSelector)
  }

  ngOnInit(): void {
    this.store.dispatch(loadcart())
    this.cartService.getProducts().subscribe(res => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  removeItem(product: any) {
    this.cartService.removeCartItem(product);

  }
  
  emptyCart() {
    this.cartService.removeAllCart()
  }


}
