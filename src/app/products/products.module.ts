import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NewProductComponent } from './components/new-product/new-product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductOverviewComponent } from './components/product-overview/product-overview.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [ProductsComponent, ProductTableComponent, ProductFormComponent, ProductDetailComponent, ProductOverviewComponent, NewProductComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    ReactiveFormsModule,
    ProductsRoutingModule
  ],
  exports: [ProductsComponent]
})
export class ProductsModule { }
