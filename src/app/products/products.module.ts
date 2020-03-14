import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [ProductsComponent, ProductTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [ProductsComponent]
})
export class ProductsModule { }
