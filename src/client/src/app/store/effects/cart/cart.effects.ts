import { deleteCart, deleteCartFailure, deleteCartSuccess, loadcart, loadcartFailure, loadcartSuccess, updateCart, updatecartFailure, updatecartSuccess } from './../../actions/cart/cart.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from 'src/app/services/cart.service';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';




@Injectable()
export class CartEffects {

  loadCart$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadcart),
    mergeMap(() =>
      this.cartService.getCart().pipe(
        map((data) =>loadcartSuccess({ data })),
        catchError((error) => of(loadcartFailure({ error })))
      )
    )
  )
  );
  
  
  
  updateCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCart),
      mergeMap((action) =>
        this.cartService.  updateProductCart(action.data).pipe(
          map((data) => updatecartSuccess({ data })),
          catchError((error) => of(updatecartFailure({ error })))
        )
      )
    )
  );
  deleteCart$ = createEffect(() =>
  this.actions$.pipe(
    ofType(deleteCart),
    mergeMap((action) =>
      this.cartService.deleteProductCart(action.data).pipe(
        map((data) => deleteCartSuccess( {data} )),
        catchError((error) => of(deleteCartFailure({ error })))
      )
    )
  )
);
constructor(private actions$: Actions, private cartService: CartService) {}
}

