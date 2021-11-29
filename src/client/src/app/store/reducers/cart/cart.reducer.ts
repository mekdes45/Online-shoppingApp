import { CartService } from 'src/app/services/cart.service';
import { Cart } from './../../../../../../shared/models/cart.model';
import { Action, createReducer, on } from '@ngrx/store';
import { deleteCartSuccess, emptyCartSuccess, loadcartSuccess, removeFromCartSuccess, selectcartAction, updatecartSuccess } from '../../actions/cart/cart.actions';



export const cartFeatureKey = 'cart';

export interface State {
  cart: Cart | null
  selectaddCart: [] | null;
}

export const initialState: State = {
  cart: null,
  selectaddCart: []

};


export const reducer = createReducer(
  initialState,
  on(loadcartSuccess, (state, action) => {
    return { ...state, cart: action.data }
  }),
 

  on(updatecartSuccess, (state, action) => {
    return {...state, cart:action.data }
  }),
  on(removeFromCartSuccess, (state, action) => {
    return {...state, cart:action.data }
  }),
  on(emptyCartSuccess, (state, action) => {
    return {...state, cart:action.data }
  }),
  on(deleteCartSuccess, (state, action) => {
    return {...state, cart:action.data }
  }),
  
  on(selectcartAction, (state, action) => {
    return { ...state, selectedCart: action.data }
  }),
  
);
