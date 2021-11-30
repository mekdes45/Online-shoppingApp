import { User } from './../../../../shared/models/user.model';
import { Product } from './../../../../shared/models/product.model';
import { ApiService } from './api.service';
import { Cart } from './../../../../shared/models/cart.model';
import { productsSelector } from 'src/app/store/selectors/product/product.selectors'
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any = [];
  public product = new BehaviorSubject<any>([])
  public search = new BehaviorSubject<string>("");

  selectedCartId = '';
  constructor(private api: ApiService) { }
  
  
  
  getProducts() {
    return this.product.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.product.next(product);
    
  }

  addToCart(product: any) {
    this.cartItemList.push(product);
    this.product.next(this.cartItemList);
    // this.getTotalPrice();
    console.log(this.cartItemList);
    // return product;
    
  }
  

  removeCartItem(product: Cart) {
    this.cartItemList.map((add: any, index: any) => {
      if (product._id === add.id) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.product.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = []
    this.product.next(this.cartItemList);
  }

  getCart(){
    return this.api.get<{ data: Cart }>('cart')
    .pipe(map((res) => res.data));
  }
  updateProductCart(product: Product ) {
    console.log("Update Cart In The Service",product)
    return this.api.put<Cart>('update-cart', product);
  }
  deleteProductCart(product: Product) {
    console.log("Delete Cart In The Service",product)
    return this.api. put<Cart>('delete-cart/' + product._id, product)
  }

  removeCartItems(product: Product) {
    return this.api.put<Cart>('remove-cart-item' ,product)
  }
  emptyCart(cart: Cart) {
    return this.api.put<Cart>('empty-cart/' + cart._id, cart)
  }
  

  selectCart(id: string) {
    this.selectedCartId = id;
  }
  
}
