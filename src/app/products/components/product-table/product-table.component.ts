import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Product } from '../../domain/product';
import { ProductTableDataSource, ProductTableItem } from './product-table-datasource';

@Component({
  selector: 'jworks-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ProductTableItem>;
  dataSource: ProductTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  @Output() productSelect = new EventEmitter<ProductTableItem>();

  private _data: Product[] = [];
  @Input() set data(newData: Product[]) {
    this._data = newData || [];
    if (this.dataSource) {
      this.dataSource.data = this._data;
    }
  }
  get data() { return this._data; }

  ngOnInit() {
    this.dataSource = new ProductTableDataSource();
    this.dataSource.data = this.data;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
