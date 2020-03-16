import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [ProductsComponent, ProductTableComponent, ProductFormComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [ProductsComponent]
})
export class ProductsModule { }
