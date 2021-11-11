import { Action, createReducer, on } from '@ngrx/store';
import { Product } from '../../../../../../shared/models/product.model';
import { createProductSuccess, loadProductsSuccess, selectProductAction } from '../../actions/product/product.actions';


export const productFeatureKey = 'product';

export interface State {
  carts: any;
  selectaddToCart: any;
  products: Product[];
  selectedProduct: Product | null;

}

export const initialState: State = {
  products:[],
  selectedProduct: null,
  carts: [],
  selectaddToCart: [],
};


export const reducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, action) => {
    return { ...state, products: action.data }
  }),
  on(createProductSuccess, (state, action) => {
    const products = [...state.products];
    products.push(action.data);
    return {...state, products}
  }),
  on(selectProductAction, (state, action) => {
    return { ...state, selectedProduct: action.data }
  }),
  
);


