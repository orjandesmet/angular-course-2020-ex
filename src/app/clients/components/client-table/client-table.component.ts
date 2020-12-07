import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Client } from '../../domain/client';
import { ClientTableDataSource, ClientTableItem } from './client-table-datasource';

@Component({
  selector: 'jworks-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ClientTableItem>;
  dataSource: ClientTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'actions'];

  @Output() clientSelect = new EventEmitter<ClientTableItem>();
  @Output() edit = new EventEmitter<ClientTableItem>();
  @Output() delete = new EventEmitter<ClientTableItem>();

  private _data: Client[] = [];
  @Input() set data(newData: Client[]) {
    this._data = newData || [];
    if (this.dataSource) {
      this.dataSource.data = this._data;
    }
  }
  get data() { return this._data; }

  ngOnInit() {
    this.dataSource = new ClientTableDataSource();
    this.dataSource.data = this.data;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
