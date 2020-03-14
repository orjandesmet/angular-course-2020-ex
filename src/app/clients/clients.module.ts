import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClientsComponent } from './clients.component';
import { ClientTableComponent } from './components/client-table/client-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FullNamePipe } from './pipes/full-name.pipe';



@NgModule({
  declarations: [ClientsComponent, ClientTableComponent, FullNamePipe],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [ClientsComponent]
})
export class ClientsModule { }
