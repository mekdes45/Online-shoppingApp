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


@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserInputComponent,
    PageUsersComponent,
    PageLoginComponent,
    HeaderComponent,
    CartComponent,
    PrductsComponent
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
    EffectsModule.forRoot([UserEffects]),
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
