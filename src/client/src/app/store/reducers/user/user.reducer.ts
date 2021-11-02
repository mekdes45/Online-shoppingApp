import { Product } from './../../../../../../shared/models/product.model';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../../../../../shared/models/user.model';
import { createProductSuccess, createUserSuccess, deleteUserSuccess, loadProductsSuccess, loadUsers, loadUsersSuccess, selectUserAction, updateUserSuccess } from '../../actions/user/user.actions';


export const userFeatureKey = 'user';

export interface State {
  users: User[];
  selectedUser: User | null;
  products: Product[];
  selectedProduct: Product | null;

}

export const initialState: State = {
  users: [],
  products:[],
  selectedUser: null,
  selectedProduct: null,
};


export const reducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, action) => {
    return { ...state, users: action.data }
  }),
  on(loadProductsSuccess, (state, action) => {
    return { ...state, products: action.data }
  }),
  on(selectUserAction, (state, action) => {
    return { ...state, selectedUser: action.data }
  }),

  
  on(updateUserSuccess, (state, action) => {
    return {...state, users: state.users.map(user => user._id === action.data._id ? action.data : user)}
  }),
  on(deleteUserSuccess, (state, action) => {
    return {...state, users: state.users.filter(user => user._id !== action.data._id)}
  }),
  
  on(createUserSuccess, (state, action) => {
    const users = [...state.users];
    users.push(action.data);
    return {...state, users}
  }),
  on(createProductSuccess, (state, action) => {
    const products = [...state.products];
    products.push(action.data);
    return {...state, products}
  })
  
);



