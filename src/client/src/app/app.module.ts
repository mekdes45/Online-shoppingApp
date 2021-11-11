import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserInputComponent } from './components/user-input/user-input.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromUser from './store/reducers/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user/user.effects';
import { PageUsersComponent } from './pages/page-users/page-users.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { PrductsComponent } from './components/prducts/prducts.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductEffects } from './store/effects/product/product.effects';
import * as fromProduct from './store/reducers/product/product.reducer';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import * as fromCart from './store/reducers/cart/cart.reducer';
import { CartEffects } from './store/effects/cart/cart.effects';
// import { ProductListComponent } from './components/product-list/product-list.component';
// import { FilterPipe } from './shared/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserInputComponent,
    PageUsersComponent,
    PageLoginComponent,
    HeaderComponent,
    CartComponent,
    PrductsComponent,
    AddProductComponent,
    PageNotFoundComponent,
  
    SignUpComponent,
    // ProductListComponent,
    // FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    EffectsModule.forRoot([UserEffects, ProductEffects, CartEffects]),
    StoreModule.forFeature(fromProduct.productFeatureKey, fromProduct.reducer),
    StoreModule.forFeature(fromCart.cartFeatureKey, fromCart.reducer),
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
