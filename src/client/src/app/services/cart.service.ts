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
  public productList = new BehaviorSubject<any>([])
  selectedCartId = '';
  constructor(private api: ApiService) { }
  
  // createCart(cart: Cart) {
  //   return this.api.post<{ data: Cart }>('create-cart', cart).pipe(map((res) => res.data));
  // }
  
  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
    
  }

  addToCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    // this.getTotalPrice();
    console.log(this.cartItemList);
    // return product;
    
  }
  
  // getTotalPrice(): number {
  //   let grandTotal = 0;
  //   this.cartItemList.map((add: any) => {
  //     grandTotal += add.total;
  //   })
  //   return grandTotal;
  // }
  // removeCartItem(product: Cart) {
  //   this.cartItemList.map((add: any, index: any) => {
  //     if (product.id === add.id) {
  //       this.cartItemList.splice(index, 1);
  //     }
  //   })
  //   this.productList.next(this.cartItemList);
  // }

  // removeAllCart() {
  //   this.cartItemList = []
  //   this.productList.next(this.cartItemList);
  // }

  getCart(){
    return this.api.get<{ data: Cart }>('cart')
    .pipe(map((res) => res.data));
  }
  updateProductCart(product: Product) {
    console.log("Update Cart In The Service",product)
    return this.api.put<Cart>('update-cart', product);
  }
  deleteProductCart(product: Product) {
    console.log("Delete Cart In The Service",product)
    return this.api. put<Cart>('delete-cart/' + product._id, product)
  }
  
 


 
  selectCart(id: string) {
    this.selectedCartId = id;
  }
  
}
