import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CartComponent } from './components/cart/cart.component';
import { PrductsComponent } from './components/prducts/prducts.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageUsersComponent } from './pages/page-users/page-users.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  { path: '**', redirectTo: 'products'},
 
  {path:'add-product',component: AddProductComponent},
  { path: 'products', component: PrductsComponent },
  {path:'cart',component:CartComponent},
  { path: 'login', component: PageLoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  {path:'checkout',component: PaymentComponent},
  {path:'Page-not-found',component:PageNotFoundComponent},
  {path: 'users', component: PageUsersComponent,
   canActivate: [AuthGuard], resolve: []}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
