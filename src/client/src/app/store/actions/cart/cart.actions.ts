import { Product } from './../../../../../../shared/models/product.model';
import { Cart } from './../../../../../../shared/models/cart.model';
import { createAction, props } from '@ngrx/store';

export const loadcart = createAction(
  '[Cart] Load Cart'
);

export const loadcartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ data: Cart }>()
);

export const loadcartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: Error }>()
);



export const selectcartAction = createAction(
  '[Cart] Select Cart',
  props<{ data: Cart | null }>()
);

export const updateCart = createAction(
  '[Cart] Update Cart',
  props<{data: Product}>()
);

export const updatecartSuccess = createAction(
  '[Cart] Update Cart Success',
  props<{ data: Cart }>()
);

export const updatecartFailure = createAction(
  '[Cart] Update Cart Failure',
  props<{ error: Error }>()
);
