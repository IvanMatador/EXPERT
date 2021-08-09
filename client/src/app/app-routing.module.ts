import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { QuitzPageComponent } from './pages/quitz-page/quitz-page.component';
import { ReferencePageComponent } from './pages/reference-page/reference-page.component';
import { PricePageComponent } from './pages/price-page/price-page.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { ReportPageComponent } from './pages/report-page/report-page.component';
import { AddCashPageComponent } from './pages/add-cash-page/add-cash-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainComponent } from './main/main.component';
import { CatalogComponent } from './main/catalog/catalog.component';
import { CartMainComponent } from './main/cart-main/cart-main.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'cart', component: CartMainComponent},
  {path: 'orders', component: OrdersPageComponent},
  {path: 'addcash', component: AddCashPageComponent},
  {path: 'reports', component: ReportPageComponent},
  {path: 'news', component: NewsPageComponent},
  {path: 'prices', component: PricePageComponent},
  {path: 'reference', component: ReferencePageComponent},
  {path: 'quitz', component: QuitzPageComponent},
  {path: 'props', component: PropertiesPageComponent},
  {path: '**', component: NotFoundComponent},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}