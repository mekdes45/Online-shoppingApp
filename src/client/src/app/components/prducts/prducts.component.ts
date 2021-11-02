import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { productSelector } from 'src/app/store/selectors/user/user.selectors';
import { Observable } from 'rxjs';
import { Product } from '../../../../../shared/models/product.model';
import { loadProducts } from 'src/app/store/actions/user/user.actions';

@Component({
  selector: 'app-prducts',
  templateUrl: './prducts.component.html',
  styleUrls: ['./prducts.component.scss']
})
export class PrductsComponent implements OnInit {
  products$:Observable<Product[]>
  public productList: any;
  constructor(private store: Store<AppState>,private productService: ProductService) {
    this.products$ = this.store.select(productSelector)
   }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res) => {
      this.productList = res;
      this.store.dispatch(loadProducts())
    })
  }

}
