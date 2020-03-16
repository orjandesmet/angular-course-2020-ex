import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NewProductComponent } from './components/new-product/new-product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductOverviewComponent } from './components/product-overview/product-overview.component';
import { ProductResolverService } from './product-resolver.service';
import { ProductsComponent } from './products.component';

const routes: Route[] = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: ProductOverviewComponent
      },
      {
        path: 'new',
        component: NewProductComponent
      },
      {
        path: ':productId',
        component: ProductDetailComponent,
        resolve: {
          product: ProductResolverService
        }
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductsRoutingModule { }
