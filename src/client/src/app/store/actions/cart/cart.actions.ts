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

export const removeFromCart = createAction(
  '[Cart] Remove Cart',
  props<{data: Product}>()
);

export const removeFromCartSuccess = createAction(
  '[Cart] Remove Cart Success',
  props<{ data: Cart }>()
);

export const removeFromCartFailure = createAction(
  '[Cart] Remove Cart Failure',
  props<{ error: Error }>()
);

export const deleteCart = createAction(
  '[Cart] Delete Cart',
  props<{data: Product}>()
);

export const deleteCartSuccess = createAction(
  '[Cart] Delete Cart Success',
  props<{ data: Cart }>()
);

export const deleteCartFailure = createAction(
  '[Cart] Delete Cart Failure',
  props<{ error: Error }>()
);
