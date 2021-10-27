import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { User } from '../../../../shared/models/user.model';
import { Product } from '../../../../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  [x: string]: any;
  selectedUserId = '';

  constructor(private api: ApiService) {}


  getUsers() {
    return this.api.get<{ data: User[] }>('users').pipe(map((res) => res.data));
  }
  getProducts() {
    return this.api.get <{ data: Product[] }>('products').pipe(map((res) => res.data));
  }
  createUser(user: User) {
    return this.api.post<{ data: User }>('create-user', user).pipe(map((res) => res.data));
  }

  createProduct(product: Product) {
    return this.api.post<{ data: Product }>('create-product', product).pipe(map((res) => res.data));
  }
  login(user: Partial<User>) {
    return this.api .post<{ data: User }>('login', user).pipe(map((res) => res.data));
  }
  updateUser(user: User) {
    return this.api.put<User>('update-user/' + user._id, user);
  }

  deleteUser(user: User) {
    return this.api
      .delete<{ data: User }>('delete-user/' + user._id)
      .pipe(map((res) => res.data));
  }

  selectUser(id: string) {
    this.selectedUserId = id;
  }
}
