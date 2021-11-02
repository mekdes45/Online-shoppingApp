import { ProductService } from './../../../services/product.service';
import { Product } from './../../../../../../shared/models/product.model';
import { loadProducts, loadProductsFailure, loadProductsSuccess, createProduct, createProductSuccess,  createProductFailure } from './../../actions/user/user.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import {
  createUser,
  createUserFailure,
  createUserSuccess,
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  loginUser,
  loginUserFailure,
  loginUserSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
} from '../../actions/user/user.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((data) => loadUsersSuccess({ data })),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );

  updateUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap((action) =>
        this.userService.updateUser(action.data).pipe(
          map((data) => updateUserSuccess({ data })),
          catchError((error) => of(updateUserFailure({ error })))
        )
      )
    )
  );

  createUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      mergeMap((action) =>
        this.userService.createUser(action.data).pipe(
          map((data) => createUserSuccess({ data })),
          catchError((error) => of(createUserFailure({ error })))
        )
      )
    )
  );

  deleteUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap((action) =>
        this.userService.deleteUser(action.data).pipe(
          map((data) => deleteUserSuccess({ data })),
          catchError((error) => of(deleteUserFailure({ error })))
        )
      )
    )
  );

  loginUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loginUser),
    mergeMap((action) =>
      this.userService.login(action.data).pipe(
        map((data) => loginUserSuccess({ data })),
        catchError((error) => of(loginUserFailure({ error })))
      )
    )
  )
  );
  
  loadProducts$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadProducts),
    mergeMap(() =>
      this.productService.getProducts().pipe(
        map((data) => loadProductsSuccess({ data })),
        catchError((error) => of(loadProductsFailure({ error })))
      )
    )
  )
  );
  
  createProduct$ = createEffect(() =>
  this.actions$.pipe(
    ofType(createProduct),
    mergeMap((action) =>
      this.productService.createProduct(action.data).pipe(
        map((data) => createProductSuccess({ data })),
        catchError((error) => of(createProductFailure({ error })))
      )
    )
  )
);


  constructor(private actions$: Actions, private userService: UserService ,private productService: ProductService) {}
}
