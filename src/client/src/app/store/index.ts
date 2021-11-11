import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUser from './reducers/user/user.reducer';
import * as fromProduct from './reducers/product/product.reducer';
import * as fromCart from './reducers/cart/cart.reducer';


export interface AppState {

  [fromUser.userFeatureKey]: fromUser.State;
  [fromProduct.productFeatureKey]: fromProduct.State;
  [fromCart.cartFeatureKey]: fromCart.State;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromUser.userFeatureKey]: fromUser.reducer,
  [fromProduct.productFeatureKey]: fromProduct.reducer,
  [fromCart.cartFeatureKey]: fromCart.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
