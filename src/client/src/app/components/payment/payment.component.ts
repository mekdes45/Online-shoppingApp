import { Router } from '@angular/router';
import { usersSelector } from './../../store/selectors/user/user.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../../../shared/models/cart.model';
import { User } from '../../../../../shared/models/user.model';
import { AppState } from 'src/app/store';
import { cartSelector } from 'src/app/store/selectors/cart/cart.selectors';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  cart$: Observable<Cart | null>
  user$:Observable<User[]>
  strikeCheckout:any = null;

  constructor(private store: Store<AppState>,private router:Router) {
    this.cart$ = this.store.select(cartSelector);
    this.user$=this.store.select(usersSelector)
    
  }

  ngOnInit() {
    this.stripePaymentGateway();
  }
  
  checkout(amount:number | undefined) {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51Iw7ulF5GTmwNEHFICts8Ga8WXUhKKDeWmYseGABJ2Acf2A23r4SaEf690tZEBNTSMevFbtP7pxSSQxklEIs3haI00JkoFuj6b',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token sucessfully!');
      }
    });
  
    strikeCheckout.open({
      name: 'local',
      description: 'Payment',
      amount: amount! * 100
    });
  }
  
  stripePaymentGateway() {
    if(!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement("script");
      scr.id = "stripe-script";
      scr.type = "text/javascript";
      scr.src = "https://checkout.stripe.com/checkout.js";

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51Iw7ulF5GTmwNEHFICts8Ga8WXUhKKDeWmYseGABJ2Acf2A23r4SaEf690tZEBNTSMevFbtP7pxSSQxklEIs3haI00JkoFuj6b',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            alert('Payment via stripe successfull!');
          }
        });
      }
        
      window.document.body.appendChild(scr);
    }
  }
  

}