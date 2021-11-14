import { cartSelector } from './../../store/selectors/cart/cart.selectors';
import { AppState } from './../../store/index';
import { Observable } from 'rxjs';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../../../shared/models/cart.model';
import { Store } from '@ngrx/store';
import { Container } from '@material-ui/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cart$:Observable<Cart | null>
  public totalItem: number = 0;
  public searchTerm: string = "";
  constructor(private cartService: CartService, private store: Store<AppState>) {
    this.cart$ = this.store.select(cartSelector)
  }

  
  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res => {
      this.totalItem = res.length;
    })
    
  }
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
    
  }

 
}
// ng-container *ngIf="(cart$ | async) as cart">
//   <ng-container *ngIf="(cart.items)as items" >
// <button routerLink="cart" class="byt-primary">
// <i style="font-size: 30px" class="fas fa-cart-plus"></i>
// <span style="font-size: 10px" class="badge bg-danger">{{ items.length}}</span>
// </button>
// </ng-container>

// </ng-container>


// <button routerLink="cart" class="byt-primary">
// <i style="font-size: 30px" class="fas fa-cart-plus"></i>
// <div style="font-size: 10px" class="badge bg-danger">{{ totalItem }}</div>
// </button>